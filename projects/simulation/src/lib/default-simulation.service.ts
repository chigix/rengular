import * as jsonld from 'jsonld';
import {
  Injectable, OnDestroy, ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, of, EMPTY } from 'rxjs';
import { filter, catchError, first } from 'rxjs/operators';

import { SimulationContext } from '../interfaces';
import { SimulationService } from '../simulation.service';
import {
  ComponentMeta, ComponentsRegistryService, NetworkContextService,
  NewComponentDirective, ComponentMetaConfigDirective,
} from '@rengular/network-context';
import { assignComponentProperty, assignComponentStyle, scanGraphIntoComponentsCollection } from './utils';
import { SimulationOutletComponent } from './simulation-outlet/simulation-outlet.component';

interface SceneContext {
  sceneIRI: string;
  sceneComponentMeta: ComponentMeta<any>;
  componentsIRI: { [iri: string]: any };
  componentRefsIRI: { [iri: string]: ComponentRef<any> };
}

class SceneIRINotAvailableError extends Error {
  constructor(name?: string) {
    super(`SceneIRI is not found: [${name}], '@id' is needed for a Scene Definition.`);
  }
}

class JsonldNotFoundError extends Error {
  constructor() {
    super(`Jsonld is not found.`);
  }
}

class UnknownType extends Error {
  constructor(name: string) { super(`Type [${name}] is not registered.`); }
}

@Injectable()
export class DefaultSimulationService extends SimulationService implements OnDestroy {

  private simulationContext: SimulationContext;
  private outlet: SimulationOutletComponent;
  private destroySubject = new Subject<void>();

  public readonly initObserve: Observable<SimulationContext>; // @override
  public readonly leaveObserve: Observable<SimulationContext>; // @override
  private readonly init$ = new BehaviorSubject<SimulationContext>(null);
  private leave$ = new BehaviorSubject<SimulationContext>(null);

  private currentScene: SceneContext;

  constructor(
    private http: HttpClient,
    private componentRegistry: ComponentsRegistryService,
    private knowledgeNetwork: NetworkContextService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super();
    this.initObserve = this.init$.pipe(filter(c => !!c));
    this.leaveObserve = this.leave$.asObservable().pipe(filter(s => !!s));
  }

  /**
   * Completes the active subject, signalling to all other observables to complete.
   */
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  leave() { // @override
    this.leave$.next(this.context);
  }

  public get context() { // @override
    return this.simulationContext;
  }

  setOutlet(outlet: SimulationOutletComponent) {
    if (this.outlet) {
      throw new Error('This Outlet has been activated.');
    }
    this.outlet = outlet;
    this.initObserve.pipe(first()).subscribe(c => {
      if (!c.entryScene) {
        throw new Error('http://rengular.js.org/schema/entryScene is not provided.');
      }
      this.sceneFromIRI(c.entryScene, 'initialGekijo');
    });
  }

  init(context: object | Observable<object>): void { // @override
    this.init$.next(undefined);
    (function ensureObservable() {
      if (context instanceof Observable) {
        return context;
      }
      return of(context);
    })().pipe(first()).toPromise()
      .then(doc => jsonld.expand(doc)).then(doc => {
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
        });
      }).then((ctx: SimulationContext) => {
        this.simulationContext = ctx;
        this.init$.next(ctx);
      });
  }

  initFromUrl(contextUrl: string) {
    return this.init(this.http.get(contextUrl));
  }

  newSceneFromLd(sceneLd: object | Observable<object>): void {
    if (!this.outlet) {
      throw new Error('There is still no activated outlet for loading new scene component.');
    }
    this.knowledgeNetwork.clearDirectives();
    (function ensureObservable() {
      if (sceneLd instanceof Observable) {
        return sceneLd;
      }
      return of(sceneLd);
    })().pipe(first(), catchError(e => {
      console.error(e);
      // TODO: Throw Error Event as component output
      return EMPTY;
    })).toPromise()
      .then(doc => jsonld.flatten(doc, {}))
      .then(
        // http://rengular.js.org/schema/StaticSessionAction framing should be done in  network-context module
        flattened => jsonld.frame(flattened, {
          '@context': { '@version': 1.1 }, '@type': 'http://rengular.js.org/schema/StaticSessionAction',
        }).then(doc => jsonld.expand(doc))
          /* Init current Scene with scene component instantiation */
          // TODO: REMOVE
          // TODO: the meta config directives should be detected in network-context module directly
          .then(expandedActions => Promise.all(
            (Array.isArray(expandedActions) ? expandedActions : [expandedActions])
              .map(
                expandedAction => jsonld.compact(expandedAction, {
                  targetType: { '@type': '@id', '@id': 'http://rengular.js.org/schema/targetType' },
                  property: 'http://schema.org/name',
                  value: 'http://schema.org/value',
                }).then(
                  (action: { targetType?: string, property: string, value: any, }) => {
                    if (!action.targetType) {
                      console.warn('http://rengular.js.org/schema/targetType is invalid: ' + action);
                      return;
                    }
                    this.knowledgeNetwork.castDirective(new ComponentMetaConfigDirective(
                      action.targetType, action.property, action.value));
                  }))
          )).then(_ => flattened))
      .then(
        flattened => jsonld.frame(flattened, {
          '@context': { '@version': 1.1 }, '@type': this.componentRegistry.getSceneTypes(),
        }).then(doc => jsonld.compact(doc, {}))
          /* Init current Scene with scene component instantiation */
          .then((doc: {
            '@id'?: string,
            '@type': string[] | string, // `@type`is certain, because this expandedActions is framed by type searching
          }) => {
            if (Object.entries(doc).length === 0) {
              throw new JsonldNotFoundError();
            }
            if (!doc['@id']) {
              throw new SceneIRINotAvailableError('currentScene');
            }
            const sceneMeta = (Array.isArray(doc['@type']) ?
              doc['@type'] as string[] : [doc['@type'] as string])
              .map(type => this.componentRegistry.getMeta(type))[0];
            if (!this.outlet.sceneHost) {
              throw new Error('Element labeled as [renSceneHost] not found.');
            }
            const sceneHostRef = this.outlet.sceneHost.viewContainerRef;
            sceneHostRef.clear();
            // TODO: check inheritance to make descendant searching more correct
            if (!sceneMeta) {
              throw new Error('Root Scene is not defined');
            }
            const componentRefsIRI = {};
            componentRefsIRI[doc['@id']] = sceneHostRef.createComponent(
              this.componentFactoryResolver.resolveComponentFactory(sceneMeta.component),
            );
            const componentsIRI = {};
            componentsIRI[doc['@id']] = componentRefsIRI[doc['@id']].instance;
            this.currentScene = {
              sceneIRI: doc['@id'],
              sceneComponentMeta: sceneMeta,
              componentsIRI, componentRefsIRI,
            };
          }).then(_ => flattened))
      .then(
        flattened => jsonld.frame(flattened, {
          '@context': { '@version': 1.1 }, '@type': this.componentRegistry.getSceneTypes(),
        }).then(doc => jsonld.expand(doc)).then(doc => jsonld.compact(doc, {}))
          /* assign ld into children components */
          .then(doc => assignComponentProperty(
            this.componentRegistry, this.currentScene.sceneComponentMeta,
            this.currentScene.componentsIRI[this.currentScene.sceneIRI], doc)).then(_ => flattened))
      .then(
        flattened => jsonld.frame(flattened, {
          '@context': { '@version': 1.1 }, '@type': 'http://rengular.js.org/schema/ComponentAction',
        }).then(doc => jsonld.expand(doc)).then(doc => Array.isArray(doc) ? doc : [doc])
          .then(expandedActions => Promise.all(expandedActions.map(
            expandedAction => jsonld.compact(expandedAction, {})
              /* Execute Children Component Create Action */
              .then(action => new Promise<{ meta: ComponentMeta<any>, iri: string, data: object }>(resolve => {
                const objectDoc = action['http://schema.org/object'];
                const targetDoc = action['http://schema.org/target'];
                if (!objectDoc['@id'] || !targetDoc['@id']) {
                  console.warn('"@id" is missing: ' + JSON.stringify(action, null, 2));
                  return;
                }
                const meta = this.componentRegistry.getMeta(objectDoc['@type']);
                if (!meta) {
                  throw new UnknownType(objectDoc['@id']);
                }
                // TODO: dispatch directive to specific target IRI
                const directive: NewComponentDirective = {
                  '@type': 'http://rengular.js.org/schema/ComponentAction',
                  meta, componentId: objectDoc['@id'],
                  finish: () => {
                    resolve({ meta, iri: objectDoc['@id'], data: objectDoc });
                  },
                };
                this.knowledgeNetwork.castDirective(directive);
              })).then(ctx => assignComponentProperty(
                this.componentRegistry, ctx.meta,
                this.currentScene.componentsIRI[ctx.iri], ctx.data))
          ))).then(_ => flattened))
      .then(
        flattened => jsonld.expand(flattened)
          /* collect all components indexed by IRI for components styling later */
          .then(expanded => scanGraphIntoComponentsCollection(
            this.componentRegistry,
            Array.isArray(expanded) ? expanded : [expanded],
            this.currentScene.sceneIRI,
            this.currentScene.componentsIRI)).then(_ => flattened))
      .then(flattened => {
        jsonld.expand(flattened).then(doc => Array.isArray(doc) ? doc : [doc])
          .then(nodes => nodes.filter(node => (
            node['@type']
            && node['@type']
              .find(typeIRI => this.componentRegistry.getCssActionTypes().indexOf(typeIRI) > -1)
            && node['http://schema.org/target']
          )))
          .then(expandedActions => Promise.all(
            /* Execute Components Styling Action */
            expandedActions.map(expandedAction => jsonld.compact(expandedAction, {
              '@version': 1.1,
              version: 'http://schema.org/version',
              interfaceVersion: 'http://schema.org/schemaVersion',
              targetComponent: 'http://schema.org/target',
              matchMedia: 'http://rengular.js.org/schema/matchMedia',
              '@vocab': 'http://rengular.js.org/schema/CssStyle#',
            }).then((action: {
              targetComponent: { '@id': string },
              matchMedia?: string | string[],
            }) => {
              const targetComponent = this.currentScene.componentRefsIRI[action.targetComponent['@id']];
              if (!targetComponent) {
                return;
              }
              const styling: { [property: string]: string, matchMedia: string } = {
                matchMedia: 'ALL',
              };
              for (const property in action) {
                if (action.hasOwnProperty(property)
                  && !property.startsWith('@') && ['targetComponent'].indexOf(property) < 0) {
                  styling[property] = action[property];
                }
              }
              const ele = targetComponent.location.nativeElement;
              assignComponentStyle([styling], ele);
            }))));
      });
  }

  sceneFromIRI(sceneUrl: string, label?: string) { // @override
    if (!sceneUrl) {
      throw new SceneIRINotAvailableError(label);
    }
    return this.newSceneFromLd(this.http.get(sceneUrl));
  }

  getComponentByIRI(id: string) { // @override
    if (!this.currentScene) {
      throw new Error('No Available Scene Loaded!');
    }
    return this.currentScene.componentsIRI[id];
  }

  registerComponentIRI(id: string, component: ComponentRef<any>) { // @override
    if (!this.currentScene) {
      throw new Error('No Available Scene Loaded!');
    }
    this.currentScene.componentRefsIRI[id] = component;
    this.currentScene.componentsIRI[id] = component.instance;
  }

}
