import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPaymentsPage } from './register-payments.page';

describe('RegisterPaymentsPage', () => {
  let component: RegisterPaymentsPage;
  let fixture: ComponentFixture<RegisterPaymentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPaymentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
