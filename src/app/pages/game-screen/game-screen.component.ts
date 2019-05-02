import { Component, OnInit } from '@angular/core';

import { ComponentsRegistryService } from 'app/renpi/services';
import { SimulationService } from 'app/modules/simulation';
import { SimpleEntryComponent } from 'app/modules/simple-entry';
import { SimpleNaviComponent } from 'app/modules/simple-navi';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  constructor(
    private simulationService: SimulationService,
    private componentRegistry: ComponentsRegistryService,
  ) {
    this.componentRegistry.register({
      simpleEntry: {
        component: SimpleEntryComponent,
        inputs: {},
      },
      simpleNavi: {
        component: SimpleNaviComponent,
        inputs: {},
      },
    });
  }

  ngOnInit() {
    // instead, init service should be applied here
    this.simulationService.newScene({
      component: 'simpleEntry',
    });
  }

}
