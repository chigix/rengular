import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SimulationOutletComponent } from './simulation-outlet.component';
import { SceneHostDirective } from './scene-host.directive';

@NgModule({
  declarations: [SimulationOutletComponent, SceneHostDirective],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    SimulationOutletComponent,
  ]
})
export class SimulationModule { }
