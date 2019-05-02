import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationOutletComponent } from './simulation-outlet.component';
import { SceneHostDirective } from './scene-host.directive';

@NgModule({
  declarations: [SimulationOutletComponent, SceneHostDirective],
  imports: [
    CommonModule,
  ],
  exports: [
    SimulationOutletComponent,
  ]
})
export class SimulationModule { }
