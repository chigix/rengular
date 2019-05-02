import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNaviComponent } from './simple-navi.component';

describe('SimpleNaviComponent', () => {
  let component: SimpleNaviComponent;
  let fixture: ComponentFixture<SimpleNaviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleNaviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
