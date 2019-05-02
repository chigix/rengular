import { Component, OnInit } from '@angular/core';
import { Resolution } from './resolutions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'ren-simulation',
  templateUrl: './simulation-outlet.component.html',
  styleUrls: ['./simulation-outlet.component.scss']
})
export class SimulationOutletComponent implements OnInit {

  resolution: Resolution;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(filter(result => result.matches))
      .subscribe(result => this.resolution = { width: 1066, height: 600 });
    this.breakpointObserver.observe(Breakpoints.Large)
      .pipe(filter(result => result.matches))
      .subscribe(result => this.resolution = { width: 1280, height: 720 });
    this.breakpointObserver.observe(Breakpoints.XLarge)
      .pipe(filter(result => result.matches))
      .subscribe(result => this.resolution = { width: 1920, height: 1080 });
  }

  ngOnInit() {
  }

}
