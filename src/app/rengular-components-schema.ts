import { ComponentMeta } from './renpi/services';
import { SimpleEntryComponent } from './modules/simple-entry';
import { SimpleNaviComponent } from './modules/simple-navi';
import { SceneComponent } from './modules/scene';
import { OarsPocketComponent } from './modules/oars-pocket';
import { TextboxComponent } from './modules/textbox';
import { ChoiceMenuComponent } from './modules/choice-menu';
import { LayeredImageComponent } from './modules/layered-image';

const REGULAR_REGISTRY: {
  [componentAlias: string]: ComponentMeta,
} = {
  simpleEntry: {
    component: SimpleEntryComponent,
    inputs: {},
    children: { simpleNavi: 'simpleNavi' },
  },
  simpleNavi: {
    component: SimpleNaviComponent,
    inputs: {
      topGap: 'number',
      absoluteInViewport: 'boolean',
      i18n: 'map',
      startScene: 'string',
    },
    children: {},
  },
  scene: {
    component: SceneComponent,
    inputs: {
      appendToTop: 'array',
      // program: 'array',
      backgroundImageUrl: 'string',
    },
    children: {},
  },
  oarsPocket: {
    component: OarsPocketComponent,
    inputs: {
      horizontal: 'boolean',
      prevScene: 'string',
      nextScene: 'string',
      i18n: 'map',
    },
    children: {},
  },
  textbox: {
    component: TextboxComponent,
    inputs: {
      text: 'string',
    },
    children: {},
  },
  choiceMenu: {
    component: ChoiceMenuComponent,
    inputs: {
      choices: 'array',
    },
    children: {},
  },
  layeredImage: {
    component: LayeredImageComponent,
    inputs: {
      name: 'string',
      imgUrl: 'string',
      width: 'number',
      height: 'number',
    },
    children: {},
  },
};

export default REGULAR_REGISTRY;
