import {
  Component, ComponentFactoryResolver, OnInit, OnDestroy,
  Input, ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewComponentDirective, NetworkContextService } from '@rengular/network-context';
import { SimulationService } from '@rengular/simulation';
import { GekijoDirective } from './directives.context';
import { ShotScopeDirective } from './shot-scope.directive';

@Component({
  selector: 'ren-gekijo',
  templateUrl: './gekijo.component.html',
  styleUrls: ['./gekijo.component.scss'],
})
export class GekijoComponent implements OnInit, OnDestroy {

  backgroundImageStyle: string;

  private destroyed$ = new BehaviorSubject(false);

  @ViewChild(ShotScopeDirective, { static: true }) shotScope: ShotScopeDirective;

  @Input() set backgroundImageUrl(url: string) {
    this.backgroundImageStyle = `url(${url})`;
  }

  @Input() nextScene?: string;

  @Input() set program(directives: GekijoDirective[]) {
    throw new Error('Not Implemented Yet');
  }

  constructor(
    private simulation: SimulationService,
    private knowledgeNetwork: NetworkContextService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    const subscription = this.knowledgeNetwork.newComponentDirectives$
      .subscribe(d => this.createComponent(d));
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
    const componentRef = this.shotScope.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(
        directive.meta.component
      )
    );
    this.simulation.registerComponentIRI(directive.componentId, componentRef);
    directive.finish();
  }

}
