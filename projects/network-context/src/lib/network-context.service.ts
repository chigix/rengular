import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComponentsRegistryService } from './components-registry.service';
import {
  ContextDirective, ComponentMetaConfigDirective, NewComponentDirective,
} from './context-directives';
import * as SHM from './schema-iris';

@Injectable()
export class NetworkContextService {

  private initializer: any = null;

  private latestDirective$ = new BehaviorSubject<{ directive: ContextDirective, finished: boolean }>(null);
  private directiveHistory: { directive: ContextDirective, finished: boolean }[] = [];

  private sessions: {
    [typeIRI: string]: { [property: string]: any }
  } = {};

  constructor(
    private registry: ComponentsRegistryService,
  ) { }

  public init(initializer: any) {
    const directiveStrategies = [
      function handleMetaConfig(directive: ContextDirective, networkCtx: NetworkContextService) {
        if (!(directive instanceof ComponentMetaConfigDirective)) {
          return;
        }
        if (!networkCtx.sessions[directive.targetType]) {
          networkCtx.sessions[directive.targetType] = {};
        }
        networkCtx.sessions[directive.targetType][directive.property] = directive.value;
        directive.finish();
      }
    ];
    if (this.initializer === null) {
      this.initializer = initializer;
    } else if (this.initializer === initializer) {
      this.clearDirectives();
      this.observeDirectives().subscribe({
        next(dir) {
          for (const handler of directiveStrategies) {
            if (dir.finished) {
              return;
            }
            handler(dir.directive, this);
          }
        },
        complete() { console.log('Current Network Context finished.'); },
      });
    } else {
      throw new Error('Current Network Context has been initialized by ' + this.initializer);
    }
  }

  public config<T>(component: any, property: string, value?: T) {
    const meta = this.registry.searchMetaByComponent(component, `Property Config: ${property}`);
    if (!this.sessions[meta.typeIRI]) {
      this.sessions[meta.typeIRI] = {};
    }
    if (value !== undefined) {
      this.sessions[meta.typeIRI][property] = value;
    } else {
      return this.sessions[meta.typeIRI][property];
    }
  }

  private observeDirectives() {
    if (!this.initializer) {
      throw new Error('network-context service is not initialized');
    }
    return concat(from(this.directiveHistory), this.latestDirective$)
      .pipe(filter(d => !!d), filter(d => !d.finished));
  }

  public get newComponentDirectives$(): Observable<NewComponentDirective> {
    return this.observeDirectives().pipe(
      filter(d => [SHM.COMPONENT_ACTION].indexOf(d.directive['@type']) > -1),
      map(d => d.directive as NewComponentDirective),
    );
  }


  public castDirective(directive: ContextDirective) {
    const managed = { directive, finished: false };
    const innerFinish = directive.finish;
    managed.directive.finish = () => { managed.finished = true; innerFinish(); };
    this.directiveHistory.push(managed);
    this.latestDirective$.next(managed);
  }

  public clearDirectives() {
    this.directiveHistory = [];
    this.latestDirective$.next(null);
  }
}
