import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SceneHostDirective } from './scene-host.directive';

@Component({
  template: `<div renSceneHost></div>`,
})
class TestComponent { }

function setup() {
  TestBed.configureTestingModule({
    providers: [],
    declarations: [SceneHostDirective, TestComponent],
  });
  const fixture = TestBed.createComponent(TestComponent);
  const des = fixture.debugElement.queryAll(By.directive(SceneHostDirective));
  return { fixture, des };
}

describe('SceneHostDirective', () => {
  it('should create an instance', () => {
    const { fixture, des } = setup();
    fixture.detectChanges();
    expect(des[0].nativeElement).toBeTruthy();
  });
});
