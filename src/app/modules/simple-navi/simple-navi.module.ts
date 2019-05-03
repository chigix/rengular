import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatListModule,
} from '@angular/material';
import { SimpleNaviComponent } from './simple-navi.component';

@NgModule({
  declarations: [SimpleNaviComponent],
  imports: [
    CommonModule,
    MatListModule,
  ],
  exports: [
    SimpleNaviComponent,
  ],
})
export class SimpleNaviModule { }
