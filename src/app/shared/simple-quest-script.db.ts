import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  GekijoLd,
  SceneLd,
  SimulationContextLd,
  CssLd,
} from 'app/renpi/rdf-schema';
import {
  SimpleEntry,
  SimpleNavi,
} from 'app/renpi';
import { ChoiceMenuLd } from 'app/modules/choice-menu';
import { LayeredImageLd } from 'app/modules/layered-image';
import { OarsPocketLd } from 'app/modules/oars-pocket';
import { TextboxLd } from 'app/modules/textbox';

interface SimpleEntryLd extends SimpleEntry {
  '@context': [
    'https://rengular.js.org/context/simple-entry.jsonld',
    {
      simpleNavi: 'http://rengular.js.org/schema/SimpleEntry/navi',
      ren: 'http://rengular.js.org/schema/',
    }
  ];
  '@type': 'http://rengular.js.org/schema/SimpleEntry';
  simpleNavi: SimpleNavi & {
    '@type': 'http://rengular.js.org/schema/SimpleNavi';
    '@context': {
      Navi: 'http://rengular.js.org/schema/SimpleNavi',
      topGap: 'Navi:#topGap',
      absoluteInViewport?: 'Navi:#absoluteInViewport',
      startScene: 'Navi:#startScene',
      loadScene: 'Navi:#loadScene',
      prefScene: 'Navi:#prefScene',
      aboutScene: 'Navi:#aboutScene',
      helpScene: 'Navi:#helpScene',
      labels: 'Navi:#labels',
    };
  };
}

const TRANSLATION = {
  simpleEntry: {
    start: 'スタート（Start）',
    load: 'ロード',
    pref: '環境設定',
    help: 'ヘルプ',
    leave: '終了（Exit）',
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

const STYLES = {
  test: {
    '@context': {
      StyleAction: { '@id': 'ren:StyleAction' },
      styleList: { '@id': 'ren:styleList' },
      matchMedia: { '@id': 'ren:matchMedia' },
      color: 'http://rengular.js.org/schema/CssStyle#color',
      position: 'http://rengular.js.org/schema/CssStyle#position',
      target: 'http://rengular.js.org/schema/CssStyle#target',
      width: 'http://rengular.js.org/schema/CssStyle#width',
      height: 'http://rengular.js.org/schema/CssStyle#height',
      '@vocab': 'http://rengular.js.org/schema/CssStyle#'
    },
    '@type': 'StyleAction',
    matchMedia: 'ALL',
    'background-image': 'url(assets/demo-bg/quest-entry.png)',
    'background-position': 'bottom',
  } as CssLd,
  oarsPocket: {
    '@context': {
      StyleAction: { '@id': 'ren:StyleAction' },
      styleList: { '@id': 'ren:styleList' },
      matchMedia: { '@id': 'ren:matchMedia' },
      color: 'http://rengular.js.org/schema/CssStyle#color',
      position: 'http://rengular.js.org/schema/CssStyle#position',
      target: 'http://rengular.js.org/schema/CssStyle#target',
      width: 'http://rengular.js.org/schema/CssStyle#width',
      height: 'http://rengular.js.org/schema/CssStyle#height',
      '@vocab': 'http://rengular.js.org/schema/CssStyle#'
    },
    '@type': 'StyleAction',
    matchMedia: 'ALL',
    width: '330px',
    position: 'absolute',
    marginTop: '-45px',
    right: '0',
    color: 'cornsilk',
  } as CssLd,
  bottomText: {
    '@context': {
      StyleAction: { '@id': 'ren:StyleAction' },
      styleList: { '@id': 'ren:styleList' },
      matchMedia: { '@id': 'ren:matchMedia' },
      color: 'http://rengular.js.org/schema/CssStyle#color',
      position: 'http://rengular.js.org/schema/CssStyle#position',
      target: 'http://rengular.js.org/schema/CssStyle#target',
      width: 'http://rengular.js.org/schema/CssStyle#width',
      height: 'http://rengular.js.org/schema/CssStyle#height',
      '@vocab': 'http://rengular.js.org/schema/CssStyle#'
    },
    '@type': 'StyleAction',
    matchMedia: 'ALL',
    marginTop: '507px',
  } as CssLd,
};

const context: SimulationContextLd[] = [{
  '@context': 'https://rengular.js.org/context/init.jsonld',
  id: '1',
  name: 'simple-quest',
  title: 'RenGULAR DEMO Script: Simple Quest',
  version: '1.0.0',
  interfaceVersion: 1,
  entryScene: '/renpi/simple-quest/scene/1',
}];

const scene = [
  {
    id: '1',
    '@context': [
      'https://rengular.js.org/context/simple-entry.jsonld',
      {
        simpleNavi: 'http://rengular.js.org/schema/SimpleEntry/navi',
        ren: 'http://rengular.js.org/schema/',
      },
    ],
    '@type': 'http://rengular.js.org/schema/SimpleEntry',
    simpleNavi: {
      '@context': {
        Navi: 'http://rengular.js.org/schema/SimpleNavi',
        topGap: 'Navi:#topGap',
        absoluteInViewport: 'Navi:#absoluteInViewport',
        startScene: 'Navi:#startScene',
        loadScene: 'Navi:#loadScene',
        prefScene: 'Navi:#prefScene',
        aboutScene: 'Navi:#aboutScene',
        helpScene: 'Navi:#helpScene',
        labels: 'Navi:#labels',
      },
      '@type': 'http://rengular.js.org/schema/SimpleNavi',
      topGap: 50,
      startScene: '/renpi/simple-quest/scene/2',
      labels: JSON.stringify(TRANSLATION.simpleEntry),
    },
    '@reverse': {
      'schema:target': [{
        '@context': {
          StyleAction: { '@id': 'ren:StyleAction' },
          styleList: { '@id': 'ren:styleList' },
          matchMedia: { '@id': 'ren:matchMedia' },
          color: 'http://rengular.js.org/schema/CssStyle#color',
          position: 'http://rengular.js.org/schema/CssStyle#position',
          target: 'http://rengular.js.org/schema/CssStyle#target',
          width: 'http://rengular.js.org/schema/CssStyle#width',
          height: 'http://rengular.js.org/schema/CssStyle#height',
          '@vocab': 'http://rengular.js.org/schema/CssStyle#'
        },
        '@type': 'StyleAction',
        matchMedia: 'ALL',
        'background-image': 'url(assets/demo-bg/quest-entry.png)',
        'background-position': 'bottom',
      } as CssLd],
    },
  } as SimpleEntryLd,
  {
    id: '2',
    '@context': ['https://rengular.js.org/context/common.jsonld', {
      stylingTo: { '@id': 'schema:target' },
    }],
    '@type': 'http://rengular.js.org/schema/Scene',
    '@reverse': {
      'schema:target': [
        {
          '@type': 'ComponentAction',
          object: {
            '@context': ['https://rengular.js.org/context/common.jsonld', {
              stylingTo: { '@id': 'schema:target' },
            }],
            id: './textbox',
            '@type': 'Textbox',
            text: 'The Goal is to save the princess against the Devil.',
            '@reverse': {
              stylingTo: [STYLES.bottomText],
            },
          } as TextboxLd,
        }, {
          '@type': 'ComponentAction',
          object: {
            '@context': ['https://rengular.js.org/context/common.jsonld', {
              stylingTo: { '@id': 'schema:target' },
              nextScene: { '@id': 'ren:nextScene', '@type': '@id' },
              prevScene: { '@id': 'ren:prevScene', '@type': '@id' },
              labels: 'OarsPocket/labels',
            }],
            id: './oarsPocket',
            '@type': 'OarsPocket',
            nextScene: '/renpi/simple-quest/scene/3',
            labels: JSON.stringify({ skip: 'Next' }),
            '@reverse': {
              stylingTo: [STYLES.oarsPocket],
            },
          } as OarsPocketLd,
        }
      ],
    },
    'http://rengular.js.org/schema/backgroundImage': 'assets/demo-bg/bg_h08.jpg',
  } as SceneLd,
  // TODO: This scene could be merged into scene#2 as a gekijo program.
  {
    /** Choice Menu Sample */
    '@context': ['https://rengular.js.org/context/common.jsonld', {
      stylingTo: { '@id': 'schema:target' },
    }],
    id: '3',
    '@type': 'http://rengular.js.org/schema/Gekijo',
    '@reverse': {
      createComponent: [{
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
            choices: 'http://rengular.js.org/schema/ChoiceMenu/choices',
            title: 'schema:text',
            jumpToScene: {
              '@id': 'http://rengular.js.org/schema/nextScene', '@type': '@id',
            },
          }],
          id: './choices',
          '@type': 'ChoiceMenu',
          choices: [
            { title: 'Left Door', jumpToScene: '/renpi/simple-quest/scene/4' },
            { title: 'Right Door', jumpToScene: '/renpi/simple-quest/scene/5' },
          ],
        } as ChoiceMenuLd,
      }, {
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
          }],
          id: './textbox',
          '@type': 'Textbox',
          text: 'Which door should I enter?',
          '@reverse': {
            stylingTo: [STYLES.bottomText],
          },
        } as TextboxLd,
      }, {
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
            nextScene: { '@id': 'ren:nextScene', '@type': '@id' },
            prevScene: { '@id': 'ren:prevScene', '@type': '@id' },
            labels: 'OarsPocket/labels',
          }],
          id: './oarsPocket',
          '@type': 'OarsPocket',
          nextScene: '/renpi/simple-quest/scene/1',
          prevScene: '/renpi/simple-quest/scene/2',
          labels: JSON.stringify({ skip: 'Next' }),
          '@reverse': {
            stylingTo: [STYLES.oarsPocket],
          },
        } as OarsPocketLd,
      }],
    },
    'http://rengular.js.org/schema/backgroundImage': 'assets/demo-bg/bg_h08.jpg',
    program: [],
  } as GekijoLd,
  {
    /** Happy End */
    '@context': ['https://rengular.js.org/context/common.jsonld', {
      stylingTo: { '@id': 'schema:target' },
    }],
    id: '4',
    '@type': 'http://rengular.js.org/schema/Scene',
    '@reverse': {
      'schema:target': [{
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
            imgUrl: { '@id': 'schema:image', '@type': '@id' },
          }],
          id: './heroine',
          '@type': 'LayeredImage',
          imgUrl: 'assets/demo-bg/ki_1_05.png',
          '@reverse': {
            stylingTo: [{
              '@context': {
                StyleAction: { '@id': 'ren:StyleAction' },
                styleList: { '@id': 'ren:styleList' },
                matchMedia: { '@id': 'ren:matchMedia' },
                color: 'http://rengular.js.org/schema/CssStyle#color',
                position: 'http://rengular.js.org/schema/CssStyle#position',
                target: 'http://rengular.js.org/schema/CssStyle#target',
                width: 'http://rengular.js.org/schema/CssStyle#width',
                height: 'http://rengular.js.org/schema/CssStyle#height',
                '@vocab': 'http://rengular.js.org/schema/CssStyle#'
              },
              '@type': 'StyleAction',
              matchMedia: 'ALL',
              left: '10%',
            }],
          },
        } as LayeredImageLd,
      }, {
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
          }],
          id: './textbox',
          '@type': 'Textbox',
          text: 'Thank you ~~ Happy RenGULAR',
          '@reverse': {
            stylingTo: [{ ...STYLES.bottomText, ...{ textAlign: 'center' } }],
          },
        } as TextboxLd,
      }, {
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
            nextScene: { '@id': 'ren:nextScene', '@type': '@id' },
            prevScene: { '@id': 'ren:prevScene', '@type': '@id' },
            labels: 'OarsPocket/labels',
          }],
          id: './oarsPocket',
          '@type': 'OarsPocket',
          nextScene: '/renpi/simple-quest/scene/1',
          prevScene: '/renpi/simple-quest/scene/2',
          // labels: TRANSLATION.oarsPocket,
          labels: JSON.stringify({ skip: 'Next' }),
          '@reverse': {
            stylingTo: [STYLES.oarsPocket],
          },
        } as OarsPocketLd,
      }],
    },
    'http://rengular.js.org/schema/backgroundImage': 'assets/demo-bg/bg_h06.jpg',
  } as SceneLd,
  {
    /** Bad End */
    '@context': ['https://rengular.js.org/context/common.jsonld', {
      stylingTo: { '@id': 'schema:target' },
    }],
    id: '5',
    '@type': 'http://rengular.js.org/schema/Scene',
    '@reverse': {
      'schema:target': [{
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
            imgUrl: { '@id': 'schema:image', '@type': '@id' },
          }],
          id: './heroine',
          '@type': 'LayeredImage',
          imgUrl: 'assets/demo-bg/ki_1_05.png',
          '@reverse': {
            stylingTo: [{
              '@context': {
                StyleAction: { '@id': 'ren:StyleAction' },
                styleList: { '@id': 'ren:styleList' },
                matchMedia: { '@id': 'ren:matchMedia' },
                color: 'http://rengular.js.org/schema/CssStyle#color',
                position: 'http://rengular.js.org/schema/CssStyle#position',
                target: 'http://rengular.js.org/schema/CssStyle#target',
                width: 'http://rengular.js.org/schema/CssStyle#width',
                height: 'http://rengular.js.org/schema/CssStyle#height',
                '@vocab': 'http://rengular.js.org/schema/CssStyle#'
              },
              '@type': 'StyleAction',
              matchMedia: 'ALL',
              left: '10%',
            }],
          }
        } as LayeredImageLd,
      }, {
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
          }],
          id: './textbox',
          '@type': 'Textbox',
          text: 'Thank you ~~ Happy RenGULAR',
          '@reverse': {
            stylingTo: [{ ...STYLES.bottomText, ...{ textAlign: 'center' } }],
          }
        } as TextboxLd,
      }, {
        '@type': 'ComponentAction',
        object: {
          '@context': ['https://rengular.js.org/context/common.jsonld', {
            stylingTo: { '@id': 'schema:target' },
            nextScene: { '@id': 'ren:nextScene', '@type': '@id' },
            prevScene: { '@id': 'ren:prevScene', '@type': '@id' },
            labels: 'OarsPocket/labels',
          }],
          id: './oarsPocket',
          '@type': 'OarsPocket',
          nextScene: '/renpi/simple-quest/scene/1',
          prevScene: '/renpi/simple-quest/scene/2',
          // labels: TRANSLATION.oarsPocket,
          labels: JSON.stringify({ skip: 'Next' }),
          '@reverse': {
            stylingTo: [STYLES.oarsPocket],
          }
        } as OarsPocketLd,
      }],
    },
    'http://rengular.js.org/schema/backgroundImage': 'assets/demo-bg/cg_ki_05.png',
  } as SceneLd,
];

@Injectable({ providedIn: 'root' })
export class SimpleQuestScriptDB implements InMemoryDbService {
  createDb = () => ({ context, scene });
}
