import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryMenuComponent } from './entry-menu.component';

describe('EntryMenuComponent', () => {
  let component: EntryMenuComponent;
  let fixture: ComponentFixture<EntryMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
