import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[renSceneHost]'
})
export class SceneHostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) { }

}
