import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ren-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() { }

}
