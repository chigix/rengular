import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

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
