import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SimulationContext } from './interfaces';

export abstract class SimulationService {
  public readonly initObserve: Observable<SimulationContext>;
  public readonly leaveObserve: Observable<any>;
  public readonly context: SimulationContext;
  abstract init(context: SimulationContext | Observable<SimulationContext>): void;
  abstract leave(): void;
  abstract sceneFromIRI(iri: string, name?: string): void;
  abstract getComponentByIRI(id: string): any;
  abstract registerComponentIRI(id: string, component: ComponentRef<any>): void;
}
