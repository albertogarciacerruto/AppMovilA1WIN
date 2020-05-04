import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInventoriesPage } from './detail-inventories.page';

describe('DetailInventoriesPage', () => {
  let component: DetailInventoriesPage;
  let fixture: ComponentFixture<DetailInventoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInventoriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInventoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
