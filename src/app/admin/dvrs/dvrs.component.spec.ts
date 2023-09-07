import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvrsComponent } from './dvrs.component';

describe('DvrsComponent', () => {
  let component: DvrsComponent;
  let fixture: ComponentFixture<DvrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DvrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DvrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
