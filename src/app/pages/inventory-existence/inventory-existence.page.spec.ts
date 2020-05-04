import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryExistencePage } from './inventory-existence.page';

describe('InventoryExistencePage', () => {
  let component: InventoryExistencePage;
  let fixture: ComponentFixture<InventoryExistencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryExistencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryExistencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
