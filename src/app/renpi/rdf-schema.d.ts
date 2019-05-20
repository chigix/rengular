import { SimulationContext } from './defs';
import { GekijoDirective } from './directives';

export type json = string;

export type SimulationContextLd = SimulationContext
  & { '@context': 'https://rengular.js.org/context/init.jsonld' };

export type CssLd = {
  '@context': 'https://rengular.js.org/context/css.jsonld',
  '@type': 'StyleAction',
  [property: string]: any,
};

export type StaticSessionConfigLd = {
  '@context': {
    'targetType': { '@id': 'ren:targetType', '@type': '@id' },
  },
  '@type': 'http://rengular.js.org/schema/StaticSessionAction',
  name: string,
  value: any,
  targetType?: string,
};

export interface ComponentSchema {
  '@context': 'https://rengular.js.org/context/common.jsonld'
  | ['https://rengular.js.org/context/common.jsonld', {}];
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this component */
  id: string;
  /** The ComponentDef Type this node representing */
  '@type': string;
  stylingTo?: CssLd[];
}

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
  '@type': 'http://rengular.js.org/schema/Scene';
}

export type GekijoDirectiveLd = GekijoDirective & {
  '@context': 'https://rengular.js.org/context/common.jsonld',
};

export interface GekijoLd extends SceneBase {
  '@type': 'http://rengular.js.org/schema/Gekijo';
  program: GekijoDirectiveLd[];
}
