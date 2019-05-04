import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[scene-host]'
})
export class SceneHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
