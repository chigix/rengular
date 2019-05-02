import { Injectable, OnDestroy } from '@angular/core';
import { Type } from '@angular/core';

export class UnknownComponent extends Error { }

@Injectable({
  providedIn: 'root'
})
export class ComponentsRegistryService {

  private registry: {
    [name: string]: {
      component: Type<any>,
      inputs: {
        [name: string]: string,
      },
    },
  } = {};

  constructor() { }

  getMeta(name: string) {
    const component = this.registry[name];
    if (!component) {
      throw new UnknownComponent();
    }
    return component;
  }

  register(mapping: {
    [name: string]: {
      component: Type<any>,
      inputs: {
        [name: string]: string,
      },
    },
  }) {
    this.registry = { ...this.registry, ...mapping };
  }

}
