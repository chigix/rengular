import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceMenuComponent } from './choice-menu.component';

describe('ChoiceMenuComponent', () => {
  let component: ChoiceMenuComponent;
  let fixture: ComponentFixture<ChoiceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
