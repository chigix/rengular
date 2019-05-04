import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
} from '@angular/material';

import { ChoiceMenuComponent } from './choice-menu.component';

@NgModule({
  declarations: [ChoiceMenuComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
  ],
  exports: [
    ChoiceMenuComponent,
  ],
})
export class ChoiceMenuModule { }
