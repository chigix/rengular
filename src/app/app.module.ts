import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaruQuestScriptDB } from './shared/maru-quest-script.db';

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
import { SceneModule } from './modules/scene/scene.module';
import { SimpleEntryModule, SimpleEntryComponent } from './modules/simple-entry';
import { SimpleNaviModule, SimpleNaviComponent } from './modules/simple-navi';
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
    // DEMO Game Script DB
    HttpClientInMemoryWebApiModule.forRoot(
      MaruQuestScriptDB, {
        rootPath: 'renpi/maru-quest',
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false,
      }),
  ],
  providers: [],
  entryComponents: [SimpleEntryComponent, SimpleNaviComponent],
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
