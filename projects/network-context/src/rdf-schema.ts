import { STATIC_SESSION_CONFIG } from './lib/schema-iris';

export interface CssLd {
  '@context': 'https://rengular.js.org/context/css.jsonld';
  '@type': 'StyleAction';
  [property: string]: any;
}

export interface StaticSessionConfigLd {
  '@type': typeof STATIC_SESSION_CONFIG;
  name: string;
  value: any;
  targetType?: string;
}

export interface ComponentSchema {
  '@context': 'https://rengular.js.org/context/common.jsonld'
  | ['https://rengular.js.org/context/common.jsonld', {}];
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this component */
  id: string;
  /** The ComponentDef Type this node representing */
  '@type': string;
  stylingTo?: CssLd[];
}
