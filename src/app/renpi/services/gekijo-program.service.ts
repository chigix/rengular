import {
  Injectable, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ComponentCreation } from '../defs';
import { assignComponentProperty, assignComponentStyle } from '../utils';
import { ComponentsRegistryService } from './components-registry.service';

@Injectable()
export class GekijoProgramService {

  private currentContainer$ = new BehaviorSubject<{
    ref: ViewContainerRef, component: any
  }>(null);

  private childrenComponents: {
    [name: string]: ComponentRef<any>
  } = {};

  constructor(
    private componentRegistry: ComponentsRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  setCurrentGekijo(container: ViewContainerRef, component: any) {
    this.currentContainer$.next({
      ref: container, component,
    });
    this.currentContainer$.complete();
  }

  createComponent(directive: ComponentCreation) {
    if (!directive['@createAs']) {
      throw new Error(`'@createAs' is not defined in: [${directive}]`);
    }
    return this.currentContainer$.pipe(filter(c => !!c), first()).toPromise()
      .then(con => {
        const componentRef = con.ref.createComponent(
          this.componentFactoryResolver.resolveComponentFactory(
            this.componentRegistry.getMeta(directive['@createAs']).component));
        this.childrenComponents[directive.name] = componentRef;
        con.component[directive.name] = componentRef.instance;
        const componentMeta = this.componentRegistry.getMeta(directive['@createAs']);
        assignComponentProperty(this.componentRegistry,
          componentMeta, componentRef.instance, directive);
        assignComponentStyle(directive['@style'] || [], componentRef.location.nativeElement);
        return componentRef;
      });
  }

}
