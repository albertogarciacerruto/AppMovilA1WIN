import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrderPage } from './register-order.page';

describe('RegisterOrderPage', () => {
  let component: RegisterOrderPage;
  let fixture: ComponentFixture<RegisterOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
