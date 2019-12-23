import { NgModule } from '@angular/core';
import { GekijoComponent } from './gekijo.component';
import { ShotScopeDirective } from './shot-scope.directive';



@NgModule({
  declarations: [GekijoComponent, ShotScopeDirective],
  imports: [],
  exports: [GekijoComponent]
})
export class GekijoModule { }
