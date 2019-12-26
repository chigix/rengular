import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrySceneComponent } from './entry-scene.component';
import { EntryMenuModule } from '../entry-menu';



@NgModule({
  declarations: [EntrySceneComponent],
  imports: [
    CommonModule,
    EntryMenuModule,
  ],
  exports: [EntrySceneComponent],
  entryComponents: [EntrySceneComponent],
})
export class EntrySceneModule { }
