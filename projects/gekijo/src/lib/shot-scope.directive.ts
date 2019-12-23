import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[renShotScope]'
})
export class ShotScopeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
