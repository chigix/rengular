import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatButtonModule,
} from '@angular/material';

import { PagesRoutingModule } from './pages/pages-routing.module';
import { NavigationComponent as RengularNavigationComponent } from './pages/navigation.component';
import { RengularHomeComponent } from './pages/rengular-home/rengular-home.component';
import { GameScreenComponent } from './pages/game-screen/game-screen.component';
import { LicenseComponent } from './pages/license/license.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { SimulationModule } from './modules/simulation/simulation.module';
import { SceneModule } from './modules/scene/scene.module';
import { SimpleEntryModule } from './modules/simple-entry/simple-entry.module';
import { SimpleNaviModule } from './modules/simple-navi/simple-navi.module';
import { TextboxModule } from './modules/textbox/textbox.module';
import { OarsPocketModule } from './modules/oars-pocket/oars-pocket.module';
import { ChoiceMenuModule } from './modules/choice-menu/choice-menu.module';

@NgModule({
  declarations: [
    AppComponent,
    RengularNavigationComponent,
    RengularHomeComponent,
    LicenseComponent,
    GameScreenComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Routing
    PagesRoutingModule,
    AppRoutingModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
    // RenGULAR Components
    SimulationModule,
    SceneModule,
    SimpleEntryModule,
    SimpleNaviModule,
    TextboxModule,
    OarsPocketModule,
    ChoiceMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {
    if (isDevMode()) {
      console.log('Routes:', JSON.stringify(
        router.config, (key, value) => value.name || value, 2));
    }
  }

}
