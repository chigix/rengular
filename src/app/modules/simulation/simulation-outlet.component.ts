import {
  Component, OnInit, ComponentFactoryResolver,
  ViewChild, ComponentRef,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import {
  ComponentsRegistryService, ComponentMeta, SimulationServiceBase
} from 'app/renpi/services';
import { Scene } from 'app/renpi';

import { SimulationService } from './simulation.service';
import { SceneHostDirective } from './scene-host.directive';
import { Resolution } from './resolutions';

function assignComponentProperty(
  registry: ComponentsRegistryService,
  meta: ComponentMeta & { isAssigned?: boolean }, componentRef: any, data: any) {
  if (!meta.isAssigned) {
    for (const key in meta.inputs) {
      if (meta.inputs.hasOwnProperty(key)) {
        const type = meta.inputs[key];
        if (!type || !data[key]) {
          continue;
        }
        if (['map'].indexOf(type) > -1 && componentRef[key]) {
          data[key] = Object.assign(componentRef[key], data[key]);
        } else {
          componentRef[key] = data[key];
        }
      }
    }
  }
  meta.isAssigned = true;
  for (const name in meta.children) {
    if (meta.children.hasOwnProperty(name)) {
      const childComponent = registry.getMeta(meta.children[name]);
      const childComponentRef = componentRef[name];
      if (!childComponent || !childComponentRef || !data[name]) {
        continue;
      }
      assignComponentProperty(registry, childComponent, childComponentRef, data[name]);
    }
  }
}

@Component({
  selector: 'ren-simulation',
  templateUrl: './simulation-outlet.component.html',
  styleUrls: ['./simulation-outlet.component.scss']
})
export class SimulationOutletComponent implements OnInit {

  @ViewChild(SceneHostDirective) sceneHost: SceneHostDirective;

  private currentScene: ComponentRef<any>;

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
    this.simulationService.sceneObserve.subscribe(this.newScene.bind(this));
  }

  private newScene(scene: Scene) {
    const sceneMeta = this.componentRegistry.getMeta(scene['@component']);
    const sceneHostRef = this.sceneHost.viewContainerRef;
    sceneHostRef.clear();
    this.currentScene = sceneHostRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(sceneMeta.component));
    this.sceneDataRender(scene);
  }

  sceneDataRender(scene: Scene) {
    const sceneMeta = this.componentRegistry.getMeta(scene['@component']);
    assignComponentProperty(this.componentRegistry,
      sceneMeta, this.currentScene.instance, scene);
  }

}
