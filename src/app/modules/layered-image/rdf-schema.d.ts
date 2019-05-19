import { ComponentSchema, json } from 'app/renpi/rdf-schema';
import { ImageResource } from './layered-image.component';

export interface LayeredImageLd extends ComponentSchema, ImageResource {
  '@context': ['https://rengular.js.org/context/common.jsonld', {
    stylingTo: { '@id': 'schema:target' },
    imgUrl: { '@id': 'schema:image', '@type': '@id' };
  }]
  '@type': 'LayeredImage';
}
