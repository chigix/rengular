import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { first, filter, map } from 'rxjs/operators';
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

  resolution = { width: '100vw', height: '100vh', fontSize: null as number };

  constructor(
    private simulationService: SimulationService,
    public networkContext: NetworkContextService,
  ) { }

  ngOnInit() {
    if (this.simulationService instanceof DefaultSimulationService) {
      this.simulationService.setOutlet(this);
    }
    this.onResize({ currentTarget: window });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: { currentTarget: { innerWidth: number, innerHeight: number } }) {
    this.simulationService.initObserve.pipe(
      first(), map(init => init.screenAspect), filter(aspect => !!aspect)
    ).subscribe(aspect => {
      if (aspect.height === aspect.width) {
        if (event.currentTarget.innerHeight > event.currentTarget.innerWidth) {
          this.resolution.height = '100vw';
          this.resolution.width = '100vw';
          if (aspect.fontSize > 10) {
            this.resolution.fontSize =
              aspect.fontSize * event.currentTarget.innerWidth / aspect.width;
          }
        } else {
          this.resolution.height = '100vh';
          this.resolution.width = '100vh';
          if (aspect.fontSize > 10) {
            this.resolution.fontSize =
              aspect.fontSize * event.currentTarget.innerHeight / aspect.height;
          }
        }
      } else if ((aspect.height - aspect.width) *
        (event.currentTarget.innerHeight - event.currentTarget.innerWidth) < 0) {
        if (event.currentTarget.innerHeight > event.currentTarget.innerWidth) {
          this.resolution.height = (aspect.height * event.currentTarget.innerWidth / aspect.width) + 'px';
          this.resolution.width = '100vw';
          if (aspect.fontSize > 10) {
            this.resolution.fontSize =
              aspect.fontSize * event.currentTarget.innerWidth / aspect.width;
          }
        } else {
          this.resolution.height = '100vh';
          this.resolution.width = (aspect.width * event.currentTarget.innerHeight / aspect.height) + 'px';
          if (aspect.fontSize > 10) {
            this.resolution.fontSize =
              aspect.fontSize * event.currentTarget.innerHeight / aspect.height;
          }
        }
      } else {
        const widthRate = event.currentTarget.innerWidth / aspect.width;
        const heightRate = event.currentTarget.innerHeight / aspect.height;
        if (widthRate < heightRate) {
          this.resolution.height = (aspect.height * widthRate) + 'px';
          this.resolution.width = '100vw';
          if (aspect.fontSize > 10) { this.resolution.fontSize = aspect.fontSize * widthRate; }
        } else {
          this.resolution.height = '100vh';
          this.resolution.width = (aspect.width * heightRate) + 'px';
          if (aspect.fontSize > 10) { this.resolution.fontSize = aspect.fontSize * heightRate; }
        }
      }
    });
  }

}
