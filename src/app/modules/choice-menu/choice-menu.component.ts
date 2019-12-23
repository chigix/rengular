import { Component, OnInit, Input } from '@angular/core';
import { SimulationService } from '@rengular/simulation';

export interface ActionDef {
  name?: string;
  title: string;
  jumpToScene: string;
}

@Component({
  selector: 'app-choice-menu',
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
  ) { }

  ngOnInit() { }

}
