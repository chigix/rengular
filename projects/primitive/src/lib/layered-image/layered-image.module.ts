import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayeredImageComponent } from './layered-image.component';



@NgModule({
  declarations: [LayeredImageComponent],
  imports: [
    CommonModule
  ],
  exports: [LayeredImageComponent],
  entryComponents: [LayeredImageComponent],
})
export class LayeredImageModule { }
