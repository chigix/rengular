import * as SHM from './lib/schema-iris';
import { ComponentSchema } from '@rengular/network-context';
import { GekijoDirective } from './lib/directives.context';

interface SceneBaseSchema extends ComponentSchema {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this scene */
  id: string;
  createComponent?: {
    '@type': 'ComponentAction',
    object: ComponentSchema,
  }[];
  backgroundImage?: string;
  staticSession?: object[];
}

export interface SceneLd extends SceneBaseSchema {
  '@type': typeof SHM.SCENE_TYPE;
}

export interface GekijoDirectiveLd extends GekijoDirective {
  '@context': 'https://rengular.js.org/context/common.jsonld';
}

export interface GekijoLd extends SceneBaseSchema {
  '@type': typeof SHM.GEKIJO_TYPE;
  program: GekijoDirectiveLd[];
}
