import {
  Component, ComponentFactoryResolver,
  OnInit, OnDestroy, Input, ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewComponentDirective, NetworkContextService } from '@rengular/network-context';
import { SimulationService } from '@rengular/simulation';
import { GekijoProgramService } from './gekijo-program.service';
import { GekijoDirective } from './directives';
import { SceneHostDirective } from './scene-host.directive';

@Component({
  selector: 'ren-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  providers: [{ provide: GekijoProgramService, useClass: GekijoProgramService }],
})
export class SceneComponent implements OnInit, OnDestroy {

  backgroundImageStyle: string;

  private destroyed$ = new BehaviorSubject(false);

  constructor(
    private gekijo: GekijoProgramService,
    private simulation: SimulationService,
    private knowledgeNetwork: NetworkContextService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  @ViewChild(SceneHostDirective, { static: true }) sceneHost: SceneHostDirective;

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
    const subscription = this.knowledgeNetwork.newComponentDirectives$.subscribe(d => {
      this.createComponent(d);
    });
    this.destroyed$.subscribe(e => {
      if (e) {
        subscription.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  private createComponent(directive: NewComponentDirective) {
    const componentRef = this.sceneHost.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(
        directive.meta.component));
    this.simulation.registerComponentIRI(directive.componentId, componentRef);
    directive.finish();
  }

}
