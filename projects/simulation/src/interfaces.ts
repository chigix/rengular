export interface SimulationContext {
  /** The [IRI](https://www.w3.org/TR/json-ld/#dfn-iri) denoting this context */
  id: string;
  /** Project Code Name, alphanumerics are recommended. */
  name: string;
  /** Project Title for presenting. */
  title: string;
  /** The version of this project. Semver is recommended. */
  version: string;
  /** Determining existed api version compliance */
  interfaceVersion: number;
  entryScene: string;
  screenAspect: {
    width: number,
    height: number,
    fontSize?: number,
  };
}
