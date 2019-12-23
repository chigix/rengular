import { Injectable } from '@angular/core';
import { ComponentMeta } from '../interfaces';
import { UnknownType, UnknownComponent } from '../exceptions';
import * as SHM from './schema-iris';

function setInto(value: any, arr: any[]) {
  if (arr.indexOf(value) >= 0) {
    return;
  }
  arr.push(value);
}

@Injectable()
export class ComponentsRegistryService {

  private registry: {
    [name: string]: ComponentMeta<any>,
  } = {};

  private readonly sceneTypes = [
    SHM.SCENE, SHM.GEKIJO,
  ];

  private readonly cssActionTypes = [SHM.STYLE_ACTION];

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

  // TODO: REMOVE
  getSceneTypes() {
    return this.sceneTypes;
  }

  // TODO: REMOVE
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
