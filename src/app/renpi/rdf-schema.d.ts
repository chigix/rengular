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

export interface ComponentSchema {
  '@context': 'https://rengular.js.org/context/common.jsonld'
  | ['https://rengular.js.org/context/common.jsonld', {}];
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this component */
  id: string;
  /** The ComponentDef Type this node representing */
  '@type': string;
  backgroundImage?: string;
  '@reverse': {
    /* TODO: rename to createComponent */
    'schema:target'?: {
      '@type': 'ComponentAction',
      /** The component id would be used as the property in Scene */
      object: ComponentSchema,
    }[],
    /* TODO: rename to stylingTo */
    stylingTo?: CssLd[],
  };
}

interface SceneBase extends ComponentSchema {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this scene */
  id: string;
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
