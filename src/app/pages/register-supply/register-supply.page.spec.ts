import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupplyPage } from './register-supply.page';

describe('RegisterSupplyPage', () => {
  let component: RegisterSupplyPage;
  let fixture: ComponentFixture<RegisterSupplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSupplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSupplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
