import { ComponentSchema, json } from 'app/renpi/rdf-schema';
import { ActionDef } from './choice-menu.component';

interface ChoiceMenuActionLd extends ActionDef { }

export interface ChoiceMenuLd extends ComponentSchema {
  '@context': ['https://rengular.js.org/context/common.jsonld', {
    stylingTo: { '@id': 'schema:target' },
    choices: 'http://rengular.js.org/schema/ChoiceMenu/choices',
    title: 'schema:text',
    jumpToScene: {
      '@id': 'http://rengular.js.org/schema/nextScene',
      '@type': '@id',
    },
  }];
  '@type': 'ChoiceMenu';
  choices: ChoiceMenuActionLd[];
}
