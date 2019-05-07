import { Injectable } from '@angular/core';
import { Type } from '@angular/core';

export class UnknownComponent extends Error {
  constructor(name: string) { super(`Component name [${name}] is not registered.`); }
}

export interface ComponentMeta {
  component: Type<any>;
  inputs: {
    [name: string]: string,
  };
  children: {
    /** value as other registered component name reference */
    [name: string]: string,
  };
}

@Injectable({
  providedIn: 'root'
})
export class ComponentsRegistryService {

  private registry: {
    [name: string]: ComponentMeta,
  } = {};

  constructor() { }

  getMeta(name: string) {
    const component = this.registry[name];
    if (!component) {
      throw new UnknownComponent(name);
    }
    return component;
  }

  register(mapping: {
    [name: string]: ComponentMeta,
  }) {
    this.registry = { ...this.registry, ...mapping };
  }

}
