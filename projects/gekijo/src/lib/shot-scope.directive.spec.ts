import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { ShotScopeDirective } from './shot-scope.directive';

@Component({
  template: `<div renShotScope></div>`,
})
class TestComponent { }

function setup() {
  TestBed.configureTestingModule({
    providers: [],
    declarations: [ShotScopeDirective, TestComponent],
  });
  const fixture = TestBed.createComponent(TestComponent);
  const des = fixture.debugElement.queryAll(By.directive(ShotScopeDirective));
  return { fixture, des };
}

describe('ShotScopeDirective', () => {
  it('should create an instance', () => {
    const { des } = setup();
    expect(des[0].nativeElement).toBeTruthy();
  });
});
