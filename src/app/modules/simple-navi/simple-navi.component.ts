import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ren-simple-navi',
  templateUrl: './simple-navi.component.html',
  styleUrls: ['./simple-navi.component.scss']
})
export class SimpleNaviComponent implements OnInit {

  @Output() exit = new EventEmitter();

  @Input() topGap?: number;

  @Input() absoluteInViewport = false;

  constructor() { }

  ngOnInit() {
  }

  onQuit() {
    this.exit.emit();
  }

}
