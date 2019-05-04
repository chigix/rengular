export interface SimulationContext {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this context */
  '@id': string;
  /** Project Code Name, alphanumerics are recommended. */
  name: string;
  /** Project Title for presenting. */
  title: string;
  /** The version of this project. Semver is recommended. */
  version: string;
  /** Determining existed api version compliance */
  interfaceVersion: number;
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting the entry scene */
  entryScene: string;
}

export interface Scene {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this scene */
  '@id': string;
  /** The component's type or registered name */
  '@component': string;
  '@style'?: {
    matchMedia: string;
    [property: string]: string;
  }[];
}

export interface Gekijo extends Scene {
  program: GekijoDirective[];
}

export interface GekijoDirective {
  delay?: number;
  [property: string]: any;
}

export interface ComponentCreation {
  '@createAs': string;
  name: string;
  '@style'?: {
    matchMedia: string;
    [property: string]: string;
  }[];
}
