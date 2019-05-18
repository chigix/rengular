export interface SimpleEntry {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this context */
  id: string;
  simpleNavi: SimpleNavi;
}

export interface SimpleNavi {
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
