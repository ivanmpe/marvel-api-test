import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDescriptionPage } from './character-description.page';

describe('CharacterDescriptionPage', () => {
  let component: CharacterDescriptionPage;
  let fixture: ComponentFixture<CharacterDescriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDescriptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
