import * as jsonld from 'jsonld';
import { SimulationContext } from './interfaces';

export type SimulationContextLd = SimulationContext
  & { '@context': 'https://rengular.js.org/context/init.jsonld' };

export function compactToSimulationContext(doc: object) {
  return jsonld.compact(doc, {
    ren: 'http://rengular.js.org/schema/',
    id: '@id',
    name: 'ren:contextName',
    title: 'ren:contextTitle',
    entryScene: 'ren:nextScene',
    screenAspect: 'ren:screenAspect',
    width: 'ren:screenAspectWidth',
    height: 'ren:screenAspectHeight',
    fontSize: 'ren:screenAspectFontSize',
    version: 'http://schema.org/version',
    interfaceVersion: 'http://schema.org/schemaVersion',
  }) as Promise<SimulationContext>;
}
