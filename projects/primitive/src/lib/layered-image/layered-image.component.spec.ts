import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayeredImageComponent } from './layered-image.component';

describe('LayeredImageComponent', () => {
  let component: LayeredImageComponent;
  let fixture: ComponentFixture<LayeredImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayeredImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayeredImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
