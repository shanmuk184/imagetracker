import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturePage } from './capture.page';

describe('CapturePage', () => {
  let component: CapturePage;
  let fixture: ComponentFixture<CapturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
