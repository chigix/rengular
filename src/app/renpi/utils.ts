import {
  ComponentsRegistryService, ComponentMeta
} from 'app/renpi/services';

export class UnknownChildren extends Error {
  constructor(name: string) { super(`ChildComponent [${name}] is not defined.`); }
}

export function assignComponentProperty(
  registry: ComponentsRegistryService,
  meta: ComponentMeta<any>, component: any, data: any) {
  for (const key in meta.inputs) {
    if (meta.inputs.hasOwnProperty(key)) {
      const propertyAccessor = meta.inputs[key];
      if (!propertyAccessor || !data[key]) {
        continue;
      }
      if (isFunction(propertyAccessor)) {
        propertyAccessor(component, data[key]);
        continue;
      }
      if (data[key]['@id'] && !data[key]['@type']) {
        component[propertyAccessor] = data[key]['@id'];
      } else {
        component[propertyAccessor] = data[key];
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
