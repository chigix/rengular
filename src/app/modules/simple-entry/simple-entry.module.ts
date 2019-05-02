import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleEntryComponent } from './simple-entry.component';
import { SimpleNaviModule } from '../simple-navi/simple-navi.module';

@NgModule({
  declarations: [SimpleEntryComponent],
  imports: [
    CommonModule,
    SimpleNaviModule,
  ],
  exports: [
    SimpleEntryComponent,
  ],
})
export class SimpleEntryModule { }
