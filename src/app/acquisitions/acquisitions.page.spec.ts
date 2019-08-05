import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionsPage } from './acquisitions.page';

describe('AcquisitionsPage', () => {
  let component: AcquisitionsPage;
  let fixture: ComponentFixture<AcquisitionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquisitionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
