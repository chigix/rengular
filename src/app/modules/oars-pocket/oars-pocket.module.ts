import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule,
  MatButtonModule,
} from '@angular/material';

import { OarsPocketComponent } from './oars-pocket.component';

@NgModule({
  declarations: [OarsPocketComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
  ],
  exports: [OarsPocketComponent],
})
export class OarsPocketModule { }
