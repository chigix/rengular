import { Component, OnInit, Input } from '@angular/core';

import { SimulationServiceBase as SimulationService } from 'app/renpi/services';

@Component({
  selector: 'ren-oars-pocket',
  templateUrl: './oars-pocket.component.html',
  styleUrls: ['./oars-pocket.component.scss']
})
export class OarsPocketComponent implements OnInit {

  @Input() prevScene?: string;
  @Input() nextScene?: string;
  @Input() historyScene?: string;
  @Input() prefsScene?: string;
  @Input() horizontal = true;

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
    private simulation: SimulationService,
  ) { }

  ngOnInit() {
  }

}
