import { ComponentSchema } from '@rengular/network-context';

// TODO: REMOVE
type json = string;

export interface OarsPocketLd extends ComponentSchema {
  '@context': 'https://rengular.js.org/context/common.jsonld';
  nextScene: string;
  prevScene: string;
  'OarsPocket:#labels': json;
}
