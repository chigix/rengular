import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatListModule,
  MatRippleModule,
} from '@angular/material';
import { SimpleNaviComponent } from './simple-navi.component';

@NgModule({
  declarations: [SimpleNaviComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatRippleModule,
  ],
  exports: [
    SimpleNaviComponent,
  ],
})
export class SimpleNaviModule { }
