import { ComponentSchema } from "@rengular/network-context";
import { ImageResource } from './layered-image.component';

type json = string;

export interface LayeredImageLd extends ComponentSchema, ImageResource {
  '@context': ['https://rengular.js.org/context/common.jsonld', {
    imgUrl: { '@id': 'schema:image', '@type': '@id' };
  }]
  '@type': 'LayeredImage';
}
