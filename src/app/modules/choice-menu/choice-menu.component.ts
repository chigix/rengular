import { Component, OnInit, Input } from '@angular/core';
import { SimulationServiceBase as SimulationService } from 'app/renpi/services';

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

export interface ActionOptDef {
  gridCols: number;
}

export class ChoiceMenuComponent implements OnInit {

  @Input() title?: string;

  @Input() gridCols = 2;
  @Input() rowHeight = '40px';

  @Input() set choices(actions: ActionDef[]) {
    this.buttons = actions;
  }

  private buttons: ActionDef[] = [];

  constructor(
    private simulationService: SimulationService,
  ) { }

  ngOnInit() { }

}
