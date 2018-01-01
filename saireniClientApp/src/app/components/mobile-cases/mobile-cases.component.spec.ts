import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCasesComponent } from './mobile-cases.component';

describe('MobileCasesComponent', () => {
  let component: MobileCasesComponent;
  let fixture: ComponentFixture<MobileCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
