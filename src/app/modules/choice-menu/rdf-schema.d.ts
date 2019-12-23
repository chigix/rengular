import { ComponentSchema } from '@rengular/network-context';
import { ActionDef } from './choice-menu.component';

type json = string;

interface ChoiceMenuActionLd extends ActionDef { }

export interface ChoiceMenuLd extends ComponentSchema {
  '@context': ['https://rengular.js.org/context/common.jsonld', {
    jumpToScene: { '@id': 'http://rengular.js.org/schema/nextScene', '@type': '@id' }
  }];
  '@type': 'ChoiceMenu';
  'ChoiceMenu:#choices': ChoiceMenuActionLd[];
  'ChoiceMenu:#gridCols': number;
}
