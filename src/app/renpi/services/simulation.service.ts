import { Scene, SimulationContext } from '../defs';
import { Observable } from 'rxjs';

export abstract class SimulationServiceBase {
  public readonly initObserve: Observable<SimulationContext>;
  public readonly sceneObserve: Observable<Scene>;
  public readonly leaveObserve: Observable<any>;
  public readonly context: SimulationContext;
  abstract init(context: SimulationContext | Observable<SimulationContext>): void;
  abstract leave(): void;
  abstract gekijoFromIRI(iri: string, name?: string): void;
}
