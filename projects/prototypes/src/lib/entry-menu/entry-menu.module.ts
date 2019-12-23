import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { EntryMenuComponent } from './entry-menu.component';



@NgModule({
  declarations: [EntryMenuComponent],
  imports: [
    CommonModule, MatListModule,
  ],
  exports: [EntryMenuComponent],
})
export class EntryMenuModule { }
