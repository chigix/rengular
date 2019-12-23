import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GekijoComponent } from './gekijo.component';

describe('GekijoComponent', () => {
  let component: GekijoComponent;
  let fixture: ComponentFixture<GekijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GekijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GekijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
