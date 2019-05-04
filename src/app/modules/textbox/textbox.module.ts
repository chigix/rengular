import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './textbox.component';

@NgModule({
  declarations: [TextboxComponent],
  imports: [
    CommonModule
  ],
  exports: [TextboxComponent],
})
export class TextboxModule { }
