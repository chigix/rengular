import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Scene, SimulationContext } from 'app/renpi';
// TODO: replace with a base interface class
// http://angular.io/guide/dependency-injection-navtree#find-a-parent-component-of-known-type
import { SimulationOutletComponent } from './simulation-outlet.component';

interface SceneContext extends Scene {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SimulationService implements OnDestroy {

  /** TODO: REMOVE */
  public outlet: SimulationOutletComponent;

  private destroySubject = new Subject<void>();

  private tickSubject = new BehaviorSubject<SceneContext>(null);

  private lastScene: SceneContext;

  constructor() { }

  /**
   * Completes the active subject, signalling to all other observables to complete.
   */
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  newScene(meta: SceneContext): void {
    this.tickSubject.next(meta);
    this.lastScene = meta;
  }

  init(context: SimulationContext): void {
    // this.newScene(meta);
  }

  observeScenes(): Observable<SceneContext> {
    return this.tickSubject.pipe(filter(s => !!s));
  }

}

/**
 * TODO:
 * * make children components get simulation service
 *   from parent outlet(/simulation) component, instead of injecting
 *   simulation service directly into component constructor.
 * * Replace `SimulationOutletComponent` to a base interface class, which
 *   is expected to be provided from common package, `renpi`.
 */
