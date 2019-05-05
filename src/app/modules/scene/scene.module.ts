import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneComponent } from './scene.component';
import { BottomTextSceneComponent } from './bottom-text-scene/bottom-text-scene.component';
import { NovelTextSceneComponent } from './novel-text-scene/novel-text-scene.component';
import { SceneHostDirective } from './scene-host.directive';

@NgModule({
  declarations: [
    SceneHostDirective,
    SceneComponent,
    BottomTextSceneComponent,
    NovelTextSceneComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [SceneComponent],
})
export class SceneModule { }
