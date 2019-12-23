import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ComponentsRegistryService } from '@rengular/network-context';
import { SimulationService, DefaultSimulationService } from '@rengular/simulation';
import { NetworkContextService } from '@rengular/network-context';
import RENGULAR from 'src/app/rengular-components-schema';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  providers: [
    ComponentsRegistryService, NetworkContextService,
    { provide: SimulationService, useClass: DefaultSimulationService }
  ],
})
export class GameScreenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private knowledgeNetwork: NetworkContextService,
    private simulationService: SimulationService,
    private componentRegistry: ComponentsRegistryService,
  ) {
    this.componentRegistry.registerClass(RENGULAR);
    this.simulationService = simulationService;
  }

  ngOnInit() {
    this.knowledgeNetwork.init(this);
    const thisSimulation = this.simulationService as DefaultSimulationService;
    this.route.queryParamMap.pipe(
      map(params => params.get('init') || null)
    ).subscribe(initEntry =>
      thisSimulation.initFromUrl(initEntry || '/renpi/maru-quest/context/simple-quest')
    );
    thisSimulation.leaveObserve.subscribe(
      e => this.router.navigate(['/']));
  }

}
