import { ComponentSchema, json } from 'app/renpi/rdf-schema';

export interface OarsPocketLd extends ComponentSchema {
  '@context': ['https://rengular.js.org/context/common.jsonld', {
    stylingTo: { '@id': 'schema:target' },
    nextScene: { '@id': 'ren:nextScene', '@type': '@id' },
    prevScene: { '@id': 'ren:prevScene', '@type': '@id' },
    labels: 'OarsPocket/labels',
  }],
  nextScene: string;
  prevScene: string;
  labels: json;
}
