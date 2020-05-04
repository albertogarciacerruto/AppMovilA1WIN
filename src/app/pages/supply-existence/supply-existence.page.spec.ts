import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyExistencePage } from './supply-existence.page';

describe('SupplyExistencePage', () => {
  let component: SupplyExistencePage;
  let fixture: ComponentFixture<SupplyExistencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyExistencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyExistencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
