import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryQuotationPage } from './inventory-quotation.page';

describe('InventoryQuotationPage', () => {
  let component: InventoryQuotationPage;
  let fixture: ComponentFixture<InventoryQuotationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryQuotationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryQuotationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
