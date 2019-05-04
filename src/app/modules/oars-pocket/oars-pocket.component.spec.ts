import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OarsPocketComponent } from './oars-pocket.component';

describe('OarsPocketComponent', () => {
  let component: OarsPocketComponent;
  let fixture: ComponentFixture<OarsPocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OarsPocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OarsPocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
