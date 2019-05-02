import { Component, OnInit } from '@angular/core';

import { SimulationServiceBase } from 'app/renpi/services';

@Component({
  selector: 'ren-simple-entry',
  templateUrl: './simple-entry.component.html',
  styleUrls: ['./simple-entry.component.scss']
})
export class SimpleEntryComponent implements OnInit {

  constructor(
    private simulationService: SimulationServiceBase,
  ) { }

  public get context() {
    return this.simulationService.context;
  }

  ngOnInit() {
  }

}
