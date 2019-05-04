import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { BehaviorSubject, concat } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ComponentCreation } from '../defs';
import { ComponentsRegistryService } from './components-registry.service';

@Injectable()
export class GekijoProgramService {

  private currentContainer$ = new BehaviorSubject<ViewContainerRef>(null);

  private childrenComponents: {
    [name: string]: ComponentRef<any>
  } = {};

  constructor(
    private componentsRegistry: ComponentsRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    concat(
      this.currentContainer$.pipe(filter(c => !!c)),
    );
  }

  setCurrentGekijo(container: ViewContainerRef) {
    this.currentContainer$.next(container);
    this.currentContainer$.complete();
  }

  createComponent(directive: ComponentCreation) {
    if (!directive['@createAs']) {
      throw new Error(`'@createAs' is not defined in: [${directive}]`);
    }
    return this.currentContainer$.pipe(filter(c => !!c), first()).toPromise()
      .then(container => {
        const component = container.createComponent(
          this.componentFactoryResolver.resolveComponentFactory(
            this.componentsRegistry.getMeta(directive['@createAs']).component));
        this.childrenComponents[directive.name] = component;
        return component;
      });
  }
}
