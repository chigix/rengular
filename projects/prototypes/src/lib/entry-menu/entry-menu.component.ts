import { Component, OnInit, Input } from '@angular/core';
import { SimulationService } from '@rengular/simulation';

@Component({
  selector: 'ren-entry-menu',
  templateUrl: './entry-menu.component.html',
})
export class EntryMenuComponent implements OnInit {

  @Input() topGap?: number;
  @Input() i18n = {
    start: 'Start',
    load: 'Load',
    pref: 'Preferences',
    about: 'About',
    help: 'Help',
    leave: 'Quit',
  };

  @Input() absoluteInViewport = false;

  @Input() startScene: string;
  @Input() loadScene?: string;
  @Input() prefScene?: string;
  @Input() aboutScene?: string;
  @Input() helpScene?: string;

  constructor(
    public simulation: SimulationService,
  ) { }

  ngOnInit() { }

}
