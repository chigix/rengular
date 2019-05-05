import { Component, OnInit, Input } from '@angular/core';
import { SimulationServiceBase as SimulationService } from 'app/renpi/services';

@Component({
  selector: 'ren-simple-navi',
  templateUrl: './simple-navi.component.html',
  styleUrls: ['./simple-navi.component.scss']
})
export class SimpleNaviComponent implements OnInit {

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

  ngOnInit() {
  }

}
