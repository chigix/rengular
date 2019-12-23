import * as SHM from "./schema-defs";
import { ComponentSchema } from "@rengular/network-context";
import { GekijoDirective } from "./directives";

interface SceneBase extends ComponentSchema {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this scene */
  id: string;
  createComponent?: {
    '@type': 'ComponentAction',
    object: ComponentSchema,
  }[];
  backgroundImage?: string;
  staticSession?: object[];
}

export interface SceneLd extends SceneBase {
  '@type': typeof SHM.SCENE_TYPE;
}

export type GekijoDirectiveLd = GekijoDirective & {
  '@context': 'https://rengular.js.org/context/common.jsonld',
};

export interface GekijoLd extends SceneBase {
  '@type': typeof SHM.GEKIJO_TYPE;
  program: GekijoDirectiveLd[];
}
