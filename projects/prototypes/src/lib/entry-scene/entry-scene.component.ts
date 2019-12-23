import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulationService } from '@rengular/simulation';
import { EntryMenuComponent } from '../entry-menu';

@Component({
  selector: 'ren-entry-scene',
  templateUrl: './entry-scene.component.html',
  styleUrls: ['./entry-scene.component.scss']
})
export class EntrySceneComponent implements OnInit {

  @ViewChild(EntryMenuComponent, { static: true }) entryMenu: EntryMenuComponent;

  constructor(
    private simulationService: SimulationService,
  ) { }

  public get context() {
    return this.simulationService.context;
  }

  ngOnInit() { }

}
