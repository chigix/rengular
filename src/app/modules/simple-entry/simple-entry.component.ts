import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulationServiceBase } from 'app/renpi/services';
import { SimpleNaviComponent } from 'app/modules/simple-navi';

@Component({
  selector: 'ren-simple-entry',
  templateUrl: './simple-entry.component.html',
  styleUrls: ['./simple-entry.component.scss']
})
export class SimpleEntryComponent implements OnInit {

  @ViewChild(SimpleNaviComponent) simpleNavi: SimpleNaviComponent;

  constructor(
    private simulationService: SimulationServiceBase,
  ) { }

  public get context() {
    return this.simulationService.context;
  }

  ngOnInit() { }
}
