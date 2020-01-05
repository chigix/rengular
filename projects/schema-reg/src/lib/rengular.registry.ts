import { ComponentMeta } from '@rengular/network-context';
import { EntryMenuComponent, EntrySceneComponent } from '@rengular-component/prototypes';
import { GekijoComponent } from '@rengular-component/gekijo';
import {
  ActionDef, ChoiceMenuComponent,
  LayeredImageComponent,
  OarsPocketComponent,
  TextBoxComponent,
  DigitalClockComponent,
} from '@rengular-component/primitive';

function noop() { }

export const RENGULAR_REGISTRY: {
  [classIRI: string]: ComponentMeta<any>,
} = {
  'http://rengular.js.org/schema/SimpleEntry': {
    component: EntrySceneComponent,
    isScene: true,
    inputs: {},
    children: {
      'http://rengular.js.org/schema/SimpleEntry/navi': 'entryMenu',
    },
  } as ComponentMeta<EntrySceneComponent>,
  'http://rengular.js.org/schema/SimpleNavi': {
    component: EntryMenuComponent,
    inputs: {
      'http://rengular.js.org/schema/SimpleNavi#topGap': 'topGap',
      'http://rengular.js.org/schema/SimpleNavi#absoluteInViewport': 'absoluteInViewport',
      'http://rengular.js.org/schema/SimpleNavi#startScene': 'startScene',
      'http://rengular.js.org/schema/SimpleNavi#loadScene': 'loadScene',
      'http://rengular.js.org/schema/SimpleNavi#prefScene': 'prefScene',
      'http://rengular.js.org/schema/SimpleNavi#aboutScene': 'aboutScene',
      'http://rengular.js.org/schema/SimpleNavi#helpScene': 'helpScene',
      'http://rengular.js.org/schema/SimpleNavi#labels': (component, labels) => {
        labels = JSON.parse(labels);
        for (const label in labels) {
          if (labels.hasOwnProperty(label)) {
            component.i18n[label] = labels[label];
          }
        }
      },
    },
    children: {},
  } as ComponentMeta<EntryMenuComponent>,
  'http://schema.org/Clip': {
    component: GekijoComponent,
    isScene: true,
    inputs: {
      'http://rengular.js.org/schema/backgroundImage': 'backgroundImageUrl',
    },
    children: {},
  } as ComponentMeta<GekijoComponent>,
  'http://rengular.js.org/schema/Scene': {
    component: GekijoComponent,
    isScene: true,
    inputs: {
      'http://rengular.js.org/schema/backgroundImage': 'backgroundImageUrl',
    },
    children: {},
  } as ComponentMeta<GekijoComponent>,
  'http://rengular.js.org/schema/Gekijo': {
    component: GekijoComponent,
    isScene: true,
    inputs: {
      // program: 'array',
      'http://rengular.js.org/schema/backgroundImage': 'backgroundImageUrl',
    },
    children: {},
  } as ComponentMeta<GekijoComponent>,
  'http://rengular.js.org/schema/OarsPocket': {
    component: OarsPocketComponent,
    inputs: {
      horizontal: 'boolean',
      'http://rengular.js.org/schema/nextScene': 'nextScene',
      'http://rengular.js.org/schema/prevScene': 'prevScene',
      'http://rengular.js.org/schema/historyScene': 'historyScene',
      'http://rengular.js.org/schema/prefsScene': 'prefsScene',
      'http://rengular.js.org/schema/horizontal': 'horizontal',
      'http://rengular.js.org/schema/OarsPocket#labels': (component, label) => {
        const labels = JSON.parse(label);
        for (const key in labels) {
          if (labels.hasOwnProperty(key)) {
            component.i18n[key] = labels[key];
          }
        }
      },
    },
    children: {},
  } as ComponentMeta<OarsPocketComponent>,
  'http://rengular.js.org/schema/Textbox': {
    component: TextBoxComponent,
    inputs: {
      'http://schema.org/text': 'text',
    },
    children: {},
  } as ComponentMeta<TextBoxComponent>,
  'http://rengular.js.org/schema/ChoiceMenu': {
    component: ChoiceMenuComponent,
    inputs: {
      'http://rengular.js.org/schema/ChoiceMenu#gridCols': 'gridCols',
      'http://rengular.js.org/schema/ChoiceMenu#choices': (component, data) => {
        component.choices = data.map(tuple => ({
          name: tuple['http://schema.org/name'],
          title: tuple['http://schema.org/title'],
          jumpToScene: tuple['http://rengular.js.org/schema/nextScene']['@id'],
        } as ActionDef));
      },
    },
    children: {},
  } as ComponentMeta<ChoiceMenuComponent>,
  // TODO: Check http://rengular.js.org/schema/ChoiceMenu && http://schema.org/ItemList
  // ChooseAction --> object = Gekijo/Clip
  //              --> actionOptions = Gekijo/Clip[]
  // Demo: https://github.com/chigix/rengular/issues/29
  'http://rengular.js.org/schema/LayeredImage': {
    component: LayeredImageComponent,
    inputs: {
      'http://schema.org/name': 'name',
      'http://schema.org/width': 'width',
      'http://schema.org/height': 'height',
      'http://schema.org/image': 'imgUrl',
    },
    children: {},
  } as ComponentMeta<LayeredImageComponent>,
  'http://rengular.js.org/schema/DigitalClock': {
    component: DigitalClockComponent,
    inputs: {
      'http://schema.org/observationDate': 'observationDate',
      'http://schema.org/measuredValue': noop,
    },
    children: {},
  } as ComponentMeta<DigitalClockComponent>,
  'http://schema.org/Observation': {
    component: DigitalClockComponent,
    inputs: {
      'http://schema.org/observationDate': 'observationDate',
      'http://schema.org/measuredValue': noop,
    },
    children: {},
  } as ComponentMeta<DigitalClockComponent>,
};
