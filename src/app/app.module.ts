import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenDbInterceptor } from './interceptors';
import { SimpleQuestScriptDB } from './shared/simple-quest-script.db';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PagesRoutingModule } from './pages/pages-routing.module';
import { NavigationComponent as RengularNavigationComponent } from './pages/navigation.component';
import { RengularHomeComponent } from './pages/rengular-home/rengular-home.component';
import { GameScreenComponent } from './pages/game-screen/game-screen.component';
import { LicenseComponent } from './pages/license/license.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { SimulationModule } from '@rengular/simulation';
import { GekijoModule } from '@rengular-component/gekijo';
import { EntryMenuModule, EntrySceneModule } from '@rengular-component/prototypes';
import {
  ChoiceMenuModule, LayeredImageModule, OarsPocketModule, TextBoxModule,
  DigitalClockModule,
} from '@rengular-component/primitive';

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
    FormsModule,
    // Routing
    PagesRoutingModule,
    AppRoutingModule,
    // Material
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatProgressBarModule, MatToolbarModule,
    // RenGULAR Core
    SimulationModule,
    GekijoModule,
    // RenGULAR Prototype Components
    EntryMenuModule,
    EntrySceneModule,
    // RenGULAR Primitive Components
    TextBoxModule,
    OarsPocketModule,
    ChoiceMenuModule,
    LayeredImageModule,
    DigitalClockModule,
  ],
  providers: [
    [
      // DEMO Game Script DB
      // TODO: make a service injection module?
      {
        provide: HTTP_INTERCEPTORS,
        useFactory: () => new RenDbInterceptor(new SimpleQuestScriptDB(), '/ren-db/'),
        multi: true
      }
    ]
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
