import { ComponentSchema } from '@rengular/network-context';

type json = string;

export interface TextboxLd extends ComponentSchema {
  '@type': 'Textbox';
  text: string;
}
