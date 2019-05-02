import {
  Component, OnInit, ComponentFactoryResolver,
  ViewChild,
} from '@angular/core';
import { SimulationService } from './simulation.service';
import { SceneHostDirective } from './scene-host.directive';
import { Resolution } from './resolutions';
import { ComponentsRegistryService, SimulationServiceBase } from 'app/renpi/services';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ren-simulation',
  templateUrl: './simulation-outlet.component.html',
  styleUrls: ['./simulation-outlet.component.scss']
})
export class SimulationOutletComponent implements OnInit {

  @ViewChild(SceneHostDirective) sceneHost: SceneHostDirective;

  resolution: Resolution;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentRegistry: ComponentsRegistryService,
    private simulationService: SimulationServiceBase,
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
    if (simulationService instanceof SimulationService) {
      simulationService.setOutlet(this);
    }
  }

  ngOnInit() {
    this.simulationService.sceneObserve.subscribe(scene => {
      const sceneMeta = this.componentRegistry.getMeta(scene.component);
      const sceneHostRef = this.sceneHost.viewContainerRef;
      sceneHostRef.clear();
      const componentRef = sceneHostRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(sceneMeta.component));
      for (const key in sceneMeta.inputs) {
        if (sceneMeta.inputs.hasOwnProperty(key)) {
          const type = sceneMeta.inputs[key];
          if (type) {
            componentRef[key] = scene[key];
          }
        }
      }
    });
  }

}
