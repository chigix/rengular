import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  Scene,
  SimulationContext,
} from 'app/renpi';

type SimpleEntryScene = Scene & {
  'simpleNavi': {
    topGap?: number, absoluteInViewport?: boolean,
  }
};

function wrapRecord<T extends { '@id': string }>(data: T): T & { id: string } {
  return Object.assign({ id: data['@id'] }, data);
}

const context = [wrapRecord<SimulationContext>({
  '@id': '1',
  name: 'maru-quest',
  title: 'RenGULAR DEMO Script: Maru Quest',
  version: '1.0.0',
  interfaceVersion: 1,
  entryScene: '/renpi/maru-quest/scene/1',
})];

const scene = [
  wrapRecord<SimpleEntryScene>({
    '@id': '1', '@component': 'simpleEntry',
    simpleNavi: {
      topGap: 50,
    },
  }),
  wrapRecord<Scene>({ '@id': '2', '@component': 'simpleEntry' }),
  wrapRecord<Scene>({ '@id': '3', '@component': 'simpleEntry' }),
  wrapRecord<Scene>({ '@id': '4', '@component': 'simpleEntry' }),
  wrapRecord<Scene>({ '@id': '5', '@component': 'simpleEntry' }),
];

@Injectable({
  providedIn: 'root'
})
export class MaruQuestScriptDB implements InMemoryDbService {
  createDb() {
    return {
      context,
      scene,
    };
  }

}
