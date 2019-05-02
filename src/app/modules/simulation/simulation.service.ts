import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, of, EMPTY } from 'rxjs';
import { filter, catchError, first } from 'rxjs/operators';

import { Scene, SimulationContext } from 'app/renpi';
import { SimulationServiceBase } from 'app/renpi/services';
import { SimulationOutletComponent } from './simulation-outlet.component';

interface SceneContext extends Scene {
  [key: string]: any;
}

@Injectable()
export class SimulationService implements OnDestroy, SimulationServiceBase {

  private simulationContext: SimulationContext;

  private outlet: SimulationOutletComponent;

  private destroySubject = new Subject<void>();

  private tick$ = new BehaviorSubject<SceneContext>(null);

  public readonly initObserve: Observable<SimulationContext>;
  public readonly sceneObserve: Observable<SceneContext>;
  public readonly leaveObserve: Observable<SimulationContext>;

  private init$ = new BehaviorSubject<SimulationContext>(null);
  private leave$ = new BehaviorSubject<SimulationContext>(null);

  constructor(
    private http: HttpClient,
  ) {
    this.initObserve = this.init$.pipe(filter(c => !!c));
    this.sceneObserve = this.tick$.pipe(filter(s => !!s));
    this.leaveObserve = this.leave$.pipe(filter(s => !!s));
  }

  /**
   * Completes the active subject, signalling to all other observables to complete.
   */
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  leave() {
    this.leave$.next(this.context);
  }

  public get context() {
    return this.simulationContext;
  }

  setOutlet(outlet: SimulationOutletComponent) {
    if (this.outlet) {
      throw new Error('This Outlet has been activated.');
    }
    this.outlet = outlet;
    this.initObserve.pipe(first()).subscribe(c => {
      this.newSceneFromUrl(c.entryScene);
    });
  }

  init(context: SimulationContext | Observable<SimulationContext>): void {
    (function ensureObservable() {
      if (context instanceof Observable) {
        return context;
      }
      return of(context);
    })().pipe(first()).subscribe(ctx => {
      this.simulationContext = ctx;
      this.init$.next(ctx);
    });
  }

  initFromUrl(contextUrl: string) {
    return this.init(this.http.get<SimulationContext>(contextUrl));
  }

  newScene(meta: SceneContext | Observable<SceneContext>): void {
    (function ensureObservable() {
      if (meta instanceof Observable) {
        return meta;
      }
      return of(meta);
    })().pipe(
      first(),
      catchError(e => {
        console.error(e);
        // TODO: Throw Error Event as component output
        return EMPTY;
      })).subscribe(s => {
        this.tick$.next(s);
      });
  }

  newSceneFromUrl(sceneUrl: string) {
    return this.newScene(this.http.get<SceneContext>(sceneUrl));
  }

}
