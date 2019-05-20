import { Injectable } from '@angular/core';
import { Type } from '@angular/core';

export type typeIRI = string;
export type propertyIRI = string;
export type propertyName = string;

export class UnknownType extends Error {
  constructor(name: string) { super(`Type [${name}] is not registered.`); }
}

export class UnknownComponent extends Error {
  constructor(componentName: string) { super(`No Type registered for Component:${componentName}`); }
}

export interface ComponentMeta<T> {
  typeIRI?: string;
  component: Type<T>;
  isScene?: boolean;
  inputs: {
    [propertyIRI: string]: propertyName | ((component: T, value: any) => void),
  };
  children: {
    [propertyIRI: string]: propertyName,
  };
}

function setInto(value: any, arr: any[]) {
  if (arr.indexOf(value) >= 0) {
    return;
  }
  arr.push(value);
}

@Injectable({
  providedIn: 'root'
})
export class ComponentsRegistryService {

  private registry: {
    [name: string]: ComponentMeta<any>,
  } = {};

  private readonly sceneTypes = [
    'http://rengular.js.org/schema/Scene',
    'http://rengular.js.org/schema/Gekijo'
  ];


  private readonly cssActionTypes = ['http://rengular.js.org/schema/StyleAction'];

  constructor() { }

  getMeta<T>(name: string): ComponentMeta<T> {
    const component = this.registry[name];
    if (!component) {
      throw new UnknownType(name);
    }
    return component;
  }

  registerClass(mapping: {
    [typeIRI: string]: ComponentMeta<any>,
  }) {
    for (const typeIRI in mapping) {
      if (mapping.hasOwnProperty(typeIRI)) {
        mapping[typeIRI].typeIRI = typeIRI;
        if (mapping[typeIRI].isScene) {
          setInto(typeIRI, this.sceneTypes);
        }
      }
    }
    this.registry = { ...this.registry, ...mapping };
  }

  getSceneTypes() {
    return this.sceneTypes;
  }

  getCssActionTypes() {
    return this.cssActionTypes;
  }

  searchMetaByComponent(component: any, label: string) {
    for (const typeIRI in this.registry) {
      if (this.registry.hasOwnProperty(typeIRI)) {
        const meta = this.registry[typeIRI];
        if (component instanceof meta.component) {
          return meta;
        }
      }
    }
    throw new UnknownComponent(label);
  }

}
