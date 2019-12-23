import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulationService } from '@rengular/simulation';
import { SimpleNaviComponent } from 'src/app/modules/simple-navi';

@Component({
  selector: 'ren-simple-entry',
  templateUrl: './simple-entry.component.html',
  styleUrls: ['./simple-entry.component.scss']
})
export class SimpleEntryComponent implements OnInit {

  @ViewChild(SimpleNaviComponent, { static: true }) simpleNavi: SimpleNaviComponent;

  constructor(
    private simulationService: SimulationService,
  ) { }

  public get context() {
    return this.simulationService.context;
  }

  ngOnInit() { }
}
