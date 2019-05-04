import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  GekijoProgramService,
  SimulationServiceBase as SimulationService
} from 'app/renpi/services';
import { GekijoDirective, ComponentCreation } from 'app/renpi';
import { Gekijo } from 'app/renpi/components';

import { SceneHostDirective } from './scene-host.directive';

@Component({
  selector: 'ren-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [{ provide: GekijoProgramService, useClass: GekijoProgramService }],
})
export class SceneComponent implements OnInit, Gekijo {

  constructor(
    private gekijo: GekijoProgramService,
    private simulation: SimulationService,
  ) { }

  @ViewChild(SceneHostDirective) sceneHost: SceneHostDirective;

  @Input() nextScene?: string;
  // @Input() set bottomFill(directives: ComponentCreation[]) { }
  @Input() set appendToTop(directives: ComponentCreation[]) {
    directives.forEach(directive => {
      this.gekijo.createComponent(directive);
    });
  }


  ngOnInit() {
    this.gekijo.setCurrentGekijo(this.sceneHost.viewContainerRef, this);
  }

}
