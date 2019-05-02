export interface SimulationContext {
  /** Project Code Name, alphanumerics are recommended. */
  name: string;
  /** Project Title for presenting. */
  title: string;
  /** The version of this project. Semver is recommended. */
  version: string;
  /** Determining existed api version compliance */
  interfaceVersion: string;
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting the entry scene */
  entryScene: string;
}

export interface Scene {
  /** The component's type or registered name */
  component: string;
}

