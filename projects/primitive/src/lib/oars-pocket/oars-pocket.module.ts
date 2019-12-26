import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { OarsPocketComponent } from './oars-pocket.component';

@NgModule({
  declarations: [OarsPocketComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
  ],
  exports: [OarsPocketComponent],
  entryComponents: [OarsPocketComponent],
})
export class OarsPocketModule { }
