import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneComponent } from './scene.component';
// import { BottomTextSceneComponent } from './bottom-text-scene/bottom-text-scene.component';
// import { NovelTextSceneComponent } from './novel-text-scene/novel-text-scene.component';
import { SceneHostDirective } from './scene-host.directive';

// TODO: REMOVE
// import { OarsPocketModule } from '../oars-pocket/oars-pocket.module';
// import { TextboxModule } from '../textbox/textbox.module';

@NgModule({
  declarations: [
    SceneHostDirective,
    SceneComponent,
    // BottomTextSceneComponent,
    // NovelTextSceneComponent,
  ],
  imports: [
    CommonModule,
    // OarsPocketModule,
    // TextboxModule,
  ],
  exports: [SceneComponent],
})
export class SceneModule { }
