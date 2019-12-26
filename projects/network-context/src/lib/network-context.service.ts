import * as jsonld from 'jsonld';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, concat, from, defer, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComponentsRegistryService } from './components-registry.service';
import {
  ContextDirective, ComponentMetaConfigDirective, NewComponentDirective,
} from './directives.context';
import * as SHM from './schema-iris';
import { ComponentMeta } from '../interfaces';

const initializedContexts: { ctx: NetworkContextService, reg: ComponentsRegistryService }[] = [];

export function initContextFromComponent(
  contextService: NetworkContextService,
  schemaRegister: {
    [classIRI: string]: ComponentMeta<any>,
  },
  component: any,
) {
  contextService.init(component);
  const init = initializedContexts.find(c => c.ctx === contextService);
  init.reg.registerClass(schemaRegister);
}

@Injectable()
export class NetworkContextService {

  private initializer: any = null;

  private latestDirective$ = new BehaviorSubject<{ directive: ContextDirective, finished: boolean }>(null);
  private directiveHistory: { directive: ContextDirective, finished: boolean }[] = [];

  private latestIndexing$ = new BehaviorSubject<any>(null);
  private indexes: { [id: string]: object } = {};

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
      initializedContexts.push({ ctx: this, reg: this.registry });
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
    this.indexes = {};
    this.latestIndexing$.pipe(filter(d => !!d))
      .subscribe(jsonLd => this.indexes[jsonLd['@id']] = jsonLd);
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

  public updateNodeIndexing(expandedJsonLd: any) {
    return jsonld.expand(expandedJsonLd)
      .then((data: { '@id': string } | { '@id': string }[]) => {
        (Array.isArray(data) ? data : [data])
          .forEach(jsonLd => this.latestIndexing$.next(jsonLd));
      });
  }

  public observeNodeIndexing(typeGuard: (jsonLd: object) => boolean) {
    return defer(() => {
      return concat(of(Object.values(this.indexes)), this.latestIndexing$)
        .pipe(filter(d => !!d), filter(typeGuard));
    });
  }
}
