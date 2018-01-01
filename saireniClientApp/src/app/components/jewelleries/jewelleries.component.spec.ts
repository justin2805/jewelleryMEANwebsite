import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelleriesComponent } from './jewelleries.component';

describe('JewelleriesComponent', () => {
  let component: JewelleriesComponent;
  let fixture: ComponentFixture<JewelleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JewelleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JewelleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
