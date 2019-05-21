import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneComponent } from './scene.component';
import { SceneHostDirective } from './scene-host.directive';

@NgModule({
  declarations: [
    SceneHostDirective,
    SceneComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [SceneComponent],
})
export class SceneModule { }
