import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriesPage } from './inventories.page';

describe('InventoriesPage', () => {
  let component: InventoriesPage;
  let fixture: ComponentFixture<InventoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
