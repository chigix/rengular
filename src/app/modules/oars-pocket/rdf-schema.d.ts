import { ComponentSchema, json } from 'app/renpi/rdf-schema';

export interface OarsPocketLd extends ComponentSchema {
  '@context': 'https://rengular.js.org/context/common.jsonld',
  nextScene: string;
  prevScene: string;
  'OarsPocket:#labels': json;
}
