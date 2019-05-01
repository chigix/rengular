import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameScreenComponent } from './pages/game-screen/game-screen.component';
import { NavigationComponent } from './pages/navigation.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'game', component: GameScreenComponent },
  {
    path: '**',
    component: NavigationComponent,
    children: [
      { path: '', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
