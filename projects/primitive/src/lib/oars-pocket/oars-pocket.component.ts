import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { SimulationService } from '@rengular/simulation';
import { NetworkContextService } from '@rengular/network-context';

@Component({
  selector: 'ren-oars-pocket',
  templateUrl: './oars-pocket.component.html',
})
export class OarsPocketComponent implements OnInit, OnDestroy {

  @Input() prevScene?: string;
  @Input() nextScene?: string;
  @Input() historyScene?: string;
  @Input() prefsScene?: string;
  @Input() horizontal = true;
  private sceneFlag = false;

  @Input() i18n = {
    back: 'Back',
    history: 'History',
    skip: 'Skip',
    auto: 'Auto',
    save: 'Save',
    quickSave: 'Q.Save',
    quickLoad: 'Q.Load',
    prefs: 'Prefs',
  };

  constructor(
    public simulation: SimulationService,
    private knowledgeNetwork: NetworkContextService,
  ) { }

  public autoContext = {
    active: false,
    timeOutId: 0,
  };

  ngOnInit() {
    this.autoContext.active = this.knowledgeNetwork.config(this, 'auto') || false;
    this.tryStartAuto();
  }

  ngOnDestroy(): void {
    this.sceneFlag = true;
  }

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
    this.simulation.sceneFromIRI(sceneIri, '<nextScene>');
  }

  toggleAutoAcitve() {
    this.autoContext.active = !this.autoContext.active;
    this.knowledgeNetwork.config(this, 'auto', this.autoContext.active);
    this.tryStartAuto();
  }

  private tryStartAuto() {
    if (!this.autoContext.active) { return; }
    const seconds = this.knowledgeNetwork.config(this, 'auto-delay') || 0;
    if (this.autoContext.active && seconds > 9) {
      const currentTimeOutId = ++this.autoContext.timeOutId;
      setTimeout(() => {
        if (this.autoContext.active
          && currentTimeOutId === this.autoContext.timeOutId
          && this.nextScene
          && !this.sceneFlag) {
          this.simulation.sceneFromIRI(this.nextScene, 'nextScene');
        }
      }, seconds);
    }
  }

}
