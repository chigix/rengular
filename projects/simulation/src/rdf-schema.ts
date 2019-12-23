import { SimulationContext } from './interfaces';

export type SimulationContextLd = SimulationContext
  & { '@context': 'https://rengular.js.org/context/init.jsonld' };
