import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationOutletComponent } from './simulation-outlet.component';
import { SimpleEntryModule } from '../simple-entry/simple-entry.module';

@NgModule({
  declarations: [SimulationOutletComponent],
  imports: [
    CommonModule,
    SimpleEntryModule,
  ],
  exports: [
    SimulationOutletComponent,
  ]
})
export class SimulationModule { }
