import { Component, OnInit, ViewChild } from '@angular/core';
import { NetworkContextService } from '@rengular/network-context';

import { SimulationService } from '../../simulation.service';
import { DefaultSimulationService } from '../default-simulation.service';
import { SceneHostDirective } from '../scene-host.directive';

@Component({
  selector: 'ren-simulation',
  templateUrl: './simulation-outlet.component.html',
  styleUrls: ['./simulation-outlet.component.scss'],
})
export class SimulationOutletComponent implements OnInit {

  @ViewChild(SceneHostDirective, { static: true }) sceneHost: SceneHostDirective;

  constructor(
    private simulationService: SimulationService,
    public networkContext: NetworkContextService,
  ) { }

  ngOnInit() {
    if (this.simulationService instanceof DefaultSimulationService) {
      this.simulationService.setOutlet(this);
    }
  }

}
