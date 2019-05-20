import { Injectable } from '@angular/core';
import { ComponentsRegistryService, typeIRI } from './components-registry.service';
import { SimulationServiceBase as SimulationService } from './simulation.service';
import { StaticSessionDirective } from '../directives';

@Injectable()
export class StaticSessionService {

  private sessions: {
    [typeIRI: string]: {
      [property: string]: any,
    }
  } = {};

  constructor(
    private registry: ComponentsRegistryService,
    private simulation: SimulationService,
  ) {
    this.onStaticSessionAction();
  }

  private onStaticSessionAction() {
    const self = this;
    const subscription = this.simulation.observeDirectives().subscribe({
      next(dir) {
        if (!(dir instanceof StaticSessionDirective)) {
          return;
        }
        if (!self.sessions[dir.targetType]) {
          self.sessions[dir.targetType] = {};
        }
        self.sessions[dir.targetType][dir.property] = dir.value;
        dir.finish();
      },
      complete() {
        subscription.unsubscribe();
        self.onStaticSessionAction();
      },
    });
  }

  public config<T>(component: any, property: string, value?: T) {
    const meta = this.registry.searchMetaByComponent(component, 'Property Config: ' + property);
    if (!this.sessions[meta.typeIRI]) {
      this.sessions[meta.typeIRI] = {};
    }
    if (value !== undefined) {
      this.sessions[meta.typeIRI][property] = value;
    } else {
      return this.sessions[meta.typeIRI][property];
    }
  }

}
