import { Component, OnInit, Input } from '@angular/core';

export interface ImageResource {
  name?: string;
  width?: number;
  height?: number;
  imgUrl?: string;
}

@Component({
  selector: 'ren-layered-image',
  templateUrl: './layered-image.component.html',
  styleUrls: ['./layered-image.component.scss']
})
export class LayeredImageComponent implements OnInit {

  @Input() width?: number;
  @Input() height?: number;
  @Input() imgUrl?: string;
  @Input() name?: string;

  constructor() { }

  ngOnInit() {
  }

}
