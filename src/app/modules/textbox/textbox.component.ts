import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ren-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
