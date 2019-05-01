import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { RengularHomeComponent } from './rengular-home/rengular-home.component';
import { LicenseComponent } from './license/license.component';

const routes: Routes = [{
  path: '',
  component: NavigationComponent,
  children: [
    { path: 'license', component: LicenseComponent },
    { path: '', component: RengularHomeComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
