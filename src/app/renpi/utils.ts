import {
  ComponentsRegistryService, ComponentMeta
} from 'app/renpi/services';

export class UnknownChildren extends Error {
  constructor(name: string) { super(`ChildComponent [${name}] is not defined.`); }
}

export function assignComponentProperty(
  registry: ComponentsRegistryService,
  meta: ComponentMeta<any>, component: any, data: any) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (key.startsWith('@') || meta.children.hasOwnProperty(key)) {
        continue;
      }
      if (!meta.inputs.hasOwnProperty(key)) {
        console.warn(`Unrecognized Property: ${key}`);
        continue;
      }
      const propertyAccessor = meta.inputs[key];
      if (isFunction(propertyAccessor)) {
        propertyAccessor(component, value);
        continue;
      }
      if (value['@id'] && !value['@type']) {
        component[propertyAccessor] = value['@id'];
      } else {
        component[propertyAccessor] = value;
      }
    }
  }
  for (const name in meta.children) {
    if (meta.children.hasOwnProperty(name)) {
      const childProperty = meta.children[name];
      const childDoc = data[name];
      if (!childProperty || !childDoc) {
        continue;
      }
      const childComponent = component[childProperty];
      if (!childComponent) {
        throw new UnknownChildren(childProperty);
      }
      const childMeta = registry.searchMetaByComponent(component[childProperty], name);
      assignComponentProperty(registry, childMeta, childComponent, childDoc);
    }
  }
}

export function assignComponentStyle(
  styles: {
    matchMedia: string;
    [property: string]: string;
  }[],
  ele: HTMLElement,
) {
  // TODO: Material CDK layout service
  const style = styles[0];
  if (!style) {
    return;
  }
  for (const property in style) {
    if (style.hasOwnProperty(property) && style[property]) {
      ele.style[property] = style[property];
    }
  }
}

export function componentGraphScan(
  registry: ComponentsRegistryService,
  expandedGraph: { '@id'?: string, '@type'?: string }[],
  searchIRI: string,
  collection: { [id: string]: any },
) {
  const nodeLd = expandedGraph.find(node => node['@id'] === searchIRI);
  const nodeComponent = collection[searchIRI];
  if (!nodeLd || !nodeComponent) {
    return;
  }
  const nodeMeta = registry.searchMetaByComponent(nodeComponent, searchIRI);
  for (const propertyIRI in nodeMeta.children) {
    if (nodeMeta.children.hasOwnProperty(propertyIRI)) {
      const childIRIs: { '@id': string }[] | undefined = nodeLd[propertyIRI];
      const childProperty = nodeMeta.children[propertyIRI];
      const childComponent = nodeComponent[childProperty];
      if (!childComponent || collection[propertyIRI]
        || !childIRIs || childIRIs.length < 1) {
        continue;
      }
      collection[childIRIs[0]['@id']] = childComponent;
      componentGraphScan(registry, expandedGraph, childIRIs[0]['@id'], collection);
    }
  }
  return Promise.resolve();
}

// tslint:disable-next-line: ban-types
export function isFunction(functionToCheck): functionToCheck is Function {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
