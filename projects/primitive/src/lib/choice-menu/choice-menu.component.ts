import { Component, OnInit, Input } from '@angular/core';
import { SimulationService } from '@rengular/simulation';
import { NetworkContextService } from '@rengular/network-context';

export interface ActionDef {
  name?: string;
  title: string;
  jumpToScene: string;
}

@Component({
  selector: 'ren-choice-menu',
  templateUrl: './choice-menu.component.html',
  styleUrls: ['./choice-menu.component.scss']
})
export class ChoiceMenuComponent implements OnInit {

  @Input() title?: string;
  @Input() gridCols = 2;
  @Input() rowHeight = '40px';

  @Input() set choices(actions: ActionDef[]) {
    this.buttons = actions;
  }

  buttons: ActionDef[] = [];

  constructor(
    public simulationService: SimulationService,
    public knowledgeNetwork: NetworkContextService,
  ) { }

  ngOnInit() { }

  /**
   * TODO: whether move to simulation framework?
   * @param sceneIri sceneIRI
   */
  forwardScene(sceneIri: string) {
    // Consider More::
    // * Build the event object inside networkContext
    // * Build the event object inside simulationService
    //   * clipNumber could be available if built into simulationService
    //   * history feature could be implemented
    this.knowledgeNetwork.updateNodeIndexing({
      '@context': 'https://rengular.js.org/context/common.jsonld',
      id: sceneIri,
      '@type': 'http://schema.org/Clip',
    });
    this.simulationService.sceneFromIRI(sceneIri, 'from User Choice');
  }

  /**
   * @TODO
   * * send put request to update the object field
   * * forward the next scene from the result field in response
   * * demo: https://github.com/chigix/rengular/issues/29
   */
  putChooseResult() {
    throw new Error('Not Implemented Yet');
  }

}
