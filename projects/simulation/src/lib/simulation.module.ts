import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SimulationOutletComponent } from './simulation-outlet/simulation-outlet.component';
import { SceneHostDirective } from './scene-host.directive';



@NgModule({
  declarations: [
    SimulationOutletComponent, SceneHostDirective],
  imports: [
    HttpClientModule,
  ],
  exports: [SimulationOutletComponent]
})
export class SimulationModule { }
