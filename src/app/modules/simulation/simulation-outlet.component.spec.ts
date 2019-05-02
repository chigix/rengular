import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationOutletComponent } from './simulation-outlet.component';

describe('SimulationOutletComponent', () => {
  let component: SimulationOutletComponent;
  let fixture: ComponentFixture<SimulationOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
