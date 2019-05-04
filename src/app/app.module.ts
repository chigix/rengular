import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleQuestScriptDB } from './shared/simple-quest-script.db';

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

import { SimulationModule } from './modules/simulation';
import { SceneModule, SceneComponent } from './modules/scene';
import { SimpleEntryModule, SimpleEntryComponent } from './modules/simple-entry';
import { SimpleNaviModule, SimpleNaviComponent } from './modules/simple-navi';
import { TextboxModule, TextboxComponent } from './modules/textbox';
import { OarsPocketModule, OarsPocketComponent } from './modules/oars-pocket';
import { ChoiceMenuModule, ChoiceMenuComponent } from './modules/choice-menu';

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
    // DEMO Game Script DB
    HttpClientInMemoryWebApiModule.forRoot(
      SimpleQuestScriptDB, {
        rootPath: 'renpi/maru-quest',
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false,
      }),
  ],
  providers: [],
  entryComponents: [
    SceneComponent,
    SimpleEntryComponent, SimpleNaviComponent,
    TextboxComponent, OarsPocketComponent, ChoiceMenuComponent,
  ],
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
