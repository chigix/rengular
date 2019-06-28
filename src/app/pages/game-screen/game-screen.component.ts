import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ComponentsRegistryService, SimulationServiceBase } from 'app/renpi/services';
import { SimulationService } from 'app/modules/simulation';
import RENGULAR from 'app/rengular-components-schema';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  providers: [{ provide: SimulationServiceBase, useClass: SimulationService }],
})
export class GameScreenComponent implements OnInit {

  private simulationService: SimulationService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    simulationServiceBase: SimulationServiceBase,
    private componentRegistry: ComponentsRegistryService,
  ) {
    this.componentRegistry.registerClass(RENGULAR);
    this.simulationService = simulationServiceBase as SimulationService;
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map(params => params.get('init') || null)
    ).subscribe(initEntry =>
      this.simulationService.initFromUrl(initEntry || '/renpi/maru-quest/context/1')
    );
    this.simulationService.leaveObserve.subscribe(
      e => this.router.navigate(['/']));
    this.simulationService.initFromUrl('/renpi/maru-quest/context/1');
  }

}
