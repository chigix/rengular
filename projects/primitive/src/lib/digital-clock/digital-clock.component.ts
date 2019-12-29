import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const digitToName = 'zero one two three four five six seven eight nine'.split(' ');

@Component({
  selector: 'ren-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss']
})
export class DigitalClockComponent implements OnInit {

  @Input() set observationDate(dateTime: string) {
    this.timeTelling$.next(format(parseISO(dateTime), 'HHmmssia'));
  }

  @Input() secondUpdate = false;

  readonly timeTelling$ = new BehaviorSubject(
    format(parseISO('1970-01-01T00:00:00'), 'HHmmssia'));

  positions = ['H', ':', 'M', ':', 'S'];
  readonly weekdayNames = 'MON TUE WED THU FRI SAT SUN'.split(' ');

  constructor() { }

  ngOnInit() { }

  digitToNameContext(digit1: string, digit2: string) {
    return {
      digit1: digitToName[parseInt(digit1, 10)],
      digit2: digitToName[parseInt(digit2, 10)],
    };
  }

}
