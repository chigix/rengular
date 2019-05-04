import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  Gekijo,
  Scene,
  SimulationContext,
  ComponentCreation,
} from 'app/renpi';

const TRANSLATION = {
  simpleEntry: {
    start: 'スタート',
    load: 'ロード',
    pref: '環境設定',
    help: 'ヘルプ',
    leave: '終了',
  },
  oarsPocket: {
    back: '巻き戻し',
    history: '履歴',
    skip: 'スキップ',
    auto: 'オート',
    save: 'セーブ',
    quickSave: 'Q.セーブ',
    quickLoad: 'Q.ロード',
    prefs: '設定',
  },
};

type SimpleEntryScene = Scene & {
  simpleNavi: {
    topGap?: number, absoluteInViewport?: boolean,
  }
};

type BaseScene = Scene & {
  appendToTop: (ComponentCreation & { [prop: string]: any })[];
  oarsPocket?: {
    nextScene?: string,
  };
  textbox?: {
    text: string,
  };
};

type GekijoScene = Gekijo & BaseScene;

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
      startScene: '/renpi/maru-quest/scene/2',
      i18n: TRANSLATION.simpleEntry,
    },
    '@style': [{
      matchMedia: 'ALL',
      'background-image': 'url(/assets/demo-bg/quest-entry.png)',
      'background-position': 'bottom',
    }],
  }),
  wrapRecord<BaseScene>({
    '@id': '2', '@component': 'scene',
    appendToTop: [
      {
        name: 'textbox', '@createAs': 'textbox',
        text: 'The Goal is try to save the princess against the Devil.'
      },
      {
        name: 'oarsPocket', '@createAs': 'oarsPocket',
        nextScene: '/renpi/maru-quest/scene/3',
        // i18n: TRANSLATION.oarsPocket,
      },
    ],
  }),
  wrapRecord<GekijoScene>({
    '@id': '3', '@component': 'scene',
    appendToTop: [
      {
        name: 'textbox', '@createAs': 'textbox',
        text: 'Game Finished.'
      },
      {
        name: 'oarsPocket', '@createAs': 'oarsPocket',
        nextScene: '/renpi/maru-quest/scene/1',
        // i18n: TRANSLATION.oarsPocket,
      },
    ],
    program: [],
  }),
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
