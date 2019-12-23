import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { SimulationService } from '@rengular/simulation';
import { NetworkContextService } from '@rengular/network-context';

@Component({
  selector: 'ren-oars-pocket',
  templateUrl: './oars-pocket.component.html',
  styleUrls: ['./oars-pocket.component.scss']
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
