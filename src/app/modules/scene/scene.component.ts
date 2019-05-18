import {
  Component, ComponentFactoryResolver,
  OnInit, Input, ViewChild,
} from '@angular/core';
import {
  GekijoProgramService,
  SimulationServiceBase as SimulationService
} from 'app/renpi/services';
import { Gekijo } from 'app/renpi/components';
import { GekijoDirective, NewComponentDirective } from 'app/renpi/directives';
import { SceneHostDirective } from './scene-host.directive';

@Component({
  selector: 'ren-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [{ provide: GekijoProgramService, useClass: GekijoProgramService }],
})
export class SceneComponent implements OnInit, Gekijo {

  backgroundImageStyle: string;

  constructor(
    private gekijo: GekijoProgramService,
    private simulation: SimulationService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  @ViewChild(SceneHostDirective) sceneHost: SceneHostDirective;

  @Input() set backgroundImageUrl(url: string) {
    this.backgroundImageStyle = `url(${url})`;
  }

  @Input() nextScene?: string;

  @Input() set program(directives: GekijoDirective[]) {
    // console.log(directives);
    throw new Error('Not Implemented yet');
  }

  ngOnInit() {
    this.gekijo.setCurrentGekijo(this.sceneHost.viewContainerRef, this);
    this.simulation.observeDirectives().subscribe(dir => {
      if (['http://rengular.js.org/schema/ComponentAction',
        'https://rengular.js.org/schema/ComponentAction']
        .indexOf(dir['@type']) > -1) {
        return this.createComponent(dir as NewComponentDirective);
      }
    });
  }

  private createComponent(directive: NewComponentDirective) {
    const componentRef = this.sceneHost.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(
        directive.meta.component));
    this.simulation.registerComponentIRI(directive.componentId, componentRef);
    directive.finish();
  }

}
