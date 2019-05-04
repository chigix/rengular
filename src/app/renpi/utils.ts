import {
  ComponentsRegistryService, ComponentMeta
} from 'app/renpi/services';

export function assignComponentProperty(
  registry: ComponentsRegistryService,
  meta: ComponentMeta & { isAssigned?: boolean }, component: any, data: any) {
  if (!meta.isAssigned) {
    for (const key in meta.inputs) {
      if (meta.inputs.hasOwnProperty(key)) {
        const type = meta.inputs[key];
        if (!type || !data[key]) {
          continue;
        }
        if (['map'].indexOf(type) > -1 && component[key]) {
          data[key] = Object.assign(component[key], data[key]);
        } else {
          component[key] = data[key];
        }
      }
    }
  }
  meta.isAssigned = true;
  for (const name in meta.children) {
    if (meta.children.hasOwnProperty(name)) {
      const childMeta = registry.getMeta(meta.children[name]);
      const childComponent = component[name];
      if (!childMeta || !childComponent || !data[name]) {
        continue;
      }
      assignComponentProperty(registry, childMeta, childComponent, data[name]);
    }
  }
}

export function assignSceneStyles(
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
