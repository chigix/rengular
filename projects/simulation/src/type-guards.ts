import { SimulationContextLd } from './rdf-schema';

export function isSimulationContext(jsonLdObj: object): jsonLdObj is SimulationContextLd {
  return jsonLdObj['@id'] && jsonLdObj['http://rengular.js.org/schema/contextName']
    && jsonLdObj['http://rengular.js.org/schema/contextTitle']
    && jsonLdObj['http://rengular.js.org/schema/nextScene'];
}
