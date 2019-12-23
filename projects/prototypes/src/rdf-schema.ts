import { StaticSessionConfigLd } from '@rengular/network-context';

interface SimpleEntry {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this context */
  id: string;
  simpleNavi: SimpleNavi;
}

interface SimpleNavi {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this context */
  topGap?: number;
  absoluteInViewport?: boolean;
  startScene: string;
  loadScene?: string;
  prefScene?: string;
  aboutScene?: string;
  helpScene?: string;
  labels?: string;
}

export interface SimpleEntryLd extends SimpleEntry {
  '@context': 'https://rengular.js.org/context/simple-entry.jsonld';
  '@type': 'http://rengular.js.org/schema/SimpleEntry';
  simpleNavi: SimpleNavi & {
    '@type': 'http://rengular.js.org/schema/SimpleNavi';
    '@context': 'https://rengular.js.org/context/simple-navi.jsonld';
  };
  staticSession: StaticSessionConfigLd[];
}
