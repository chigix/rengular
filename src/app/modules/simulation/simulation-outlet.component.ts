import {
  Component, OnInit, ComponentFactoryResolver,
  ViewChild, ComponentRef,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import {
  SimulationServiceBase, StaticSessionService,
} from 'app/renpi/services';

import { SimulationService } from './simulation.service';
import { SceneHostDirective } from './scene-host.directive';
import { Resolution } from './resolutions';

@Component({
  selector: 'ren-simulation',
  templateUrl: './simulation-outlet.component.html',
  styleUrls: ['./simulation-outlet.component.scss'],
  providers: [StaticSessionService],
})
export class SimulationOutletComponent implements OnInit {

  @ViewChild(SceneHostDirective) sceneHost: SceneHostDirective;

  private currentScene: ComponentRef<any>;

  resolution: Resolution;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private simulationService: SimulationServiceBase,
    public staticSessionService: StaticSessionService,
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(filter(result => result.matches))
      .subscribe(result => this.resolution = { width: 1066, height: 600 });
    this.breakpointObserver.observe(Breakpoints.Large)
      .pipe(filter(result => result.matches))
      .subscribe(result => this.resolution = { width: 1280, height: 720 });
    this.breakpointObserver.observe(Breakpoints.XLarge)
      .pipe(filter(result => result.matches))
      .subscribe(result => this.resolution = { width: 1920, height: 1080 });
  }

  ngOnInit() {
    if (this.simulationService instanceof SimulationService) {
      this.simulationService.setOutlet(this);
    }
  }

}
