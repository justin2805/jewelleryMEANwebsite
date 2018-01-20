import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactEntriesComponent } from './view-contact-entries.component';

describe('ViewContactEntriesComponent', () => {
  let component: ViewContactEntriesComponent;
  let fixture: ComponentFixture<ViewContactEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContactEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
