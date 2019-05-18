import { ComponentRef } from '@angular/core';
import { SimulationContext, ComponentDirective } from '../defs';
import { Observable } from 'rxjs';

export abstract class SimulationServiceBase {
  public readonly initObserve: Observable<SimulationContext>;
  public readonly leaveObserve: Observable<any>;
  public readonly context: SimulationContext;
  abstract init(context: SimulationContext | Observable<SimulationContext>): void;
  abstract leave(): void;
  abstract sceneFromIRI(iri: string, name?: string): void;
  abstract getComponentByIRI(id: string): any;
  abstract registerComponentIRI(id: string, component: ComponentRef<any>): void;
  abstract observeDirectives(): Observable<ComponentDirective>;
}
