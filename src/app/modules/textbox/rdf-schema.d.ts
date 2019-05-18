import { ComponentSchema, json } from 'app/renpi/rdf-schema';

export interface TextboxLd extends ComponentSchema {
  '@type': 'Textbox';
  text: string;
}
