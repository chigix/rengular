import { Component, OnInit } from '@angular/core';

import { ComponentsRegistryService, SimulationServiceBase } from 'app/renpi/services';
import { SimulationService } from 'app/modules/simulation';
import { SimpleEntryComponent } from 'app/modules/simple-entry';
import { SimpleNaviComponent } from 'app/modules/simple-navi';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  providers: [{ provide: SimulationServiceBase, useClass: SimulationService }],
})
export class GameScreenComponent implements OnInit {

  private simulationService: SimulationService;

  constructor(
    simulationServiceBase: SimulationServiceBase,
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
    this.simulationService = simulationServiceBase as SimulationService;
  }

  ngOnInit() {
    this.simulationService.initFromUrl('/renpi/maru-quest/context/1');
  }

}
