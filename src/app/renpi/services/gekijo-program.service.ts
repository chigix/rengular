import {
  Injectable, ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GekijoProgramService {

  private currentContainer$ = new BehaviorSubject<{
    ref: ViewContainerRef, component: any
  }>(null);

  constructor() { }

  setCurrentGekijo(container: ViewContainerRef, component: any) {
    this.currentContainer$.next({
      ref: container, component,
    });
    this.currentContainer$.complete();
  }

}
