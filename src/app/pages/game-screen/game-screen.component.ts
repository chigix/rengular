import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, filter, map } from 'rxjs/operators';

import { ComponentsRegistryService } from '@rengular/network-context';
import {
  SimulationService, DefaultSimulationService, isSimulationContext,
  compactToSimulationContext,
} from '@rengular/simulation';
import { NetworkContextService } from '@rengular/network-context';
import { RENGULAR_REGISTRY } from '@rengular/ren-schema-reg';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  providers: [
    ComponentsRegistryService, NetworkContextService,
    { provide: SimulationService, useClass: DefaultSimulationService }
  ],
})
export class GameScreenComponent implements OnInit {

  resolution = { width: '100vw', height: '100vh', fontSize: null as number };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private knowledgeNetwork: NetworkContextService,
    private simulationService: SimulationService,
    private componentRegistry: ComponentsRegistryService,
  ) {
    this.componentRegistry.registerClass(RENGULAR_REGISTRY);
    this.simulationService = simulationService;
  }

  ngOnInit() {
    this.knowledgeNetwork.init(this);
    this.knowledgeNetwork.observeNodeIndexing(isSimulationContext)
      .subscribe(async jsonLd => {
        const simulationCtx = await compactToSimulationContext(jsonLd);
        if (simulationCtx.screenAspect) {
          if (simulationCtx.screenAspect.width) {
            this.resolution.width = simulationCtx.screenAspect.width + 'px';
          }
          if (simulationCtx.screenAspect.height) {
            this.resolution.height = simulationCtx.screenAspect.height + 'px';
          }
          if (simulationCtx.screenAspect.fontSize) {
            this.resolution.fontSize = simulationCtx.screenAspect.fontSize;
          }
          this.onResize({ currentTarget: window });
        }
      });
    const thisSimulation = this.simulationService as DefaultSimulationService;
    this.route.queryParamMap.pipe(
      map(params => params.get('init') || null)
    ).subscribe(initEntry =>
      thisSimulation.initFromUrl(initEntry || '/renpi/maru-quest/context/simple-quest')
    );
    thisSimulation.leaveObserve.subscribe(
      e => this.router.navigate(['/']));
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
