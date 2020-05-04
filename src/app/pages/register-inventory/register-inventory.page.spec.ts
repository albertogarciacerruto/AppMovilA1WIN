import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInventoryPage } from './register-inventory.page';

describe('RegisterInventoryPage', () => {
  let component: RegisterInventoryPage;
  let fixture: ComponentFixture<RegisterInventoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInventoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
