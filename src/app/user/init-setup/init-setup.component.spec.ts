import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitSetupComponent } from './init-setup.component';

describe('InitSetupComponent', () => {
  let component: InitSetupComponent;
  let fixture: ComponentFixture<InitSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
