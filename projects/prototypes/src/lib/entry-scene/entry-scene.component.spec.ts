import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrySceneComponent } from './entry-scene.component';

describe('EntrySceneComponent', () => {
  let component: EntrySceneComponent;
  let fixture: ComponentFixture<EntrySceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrySceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrySceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
