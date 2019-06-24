import { TestBed } from '@angular/core/testing';

import { CaptureService } from './capture.service';

describe('CaptureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaptureService = TestBed.get(CaptureService);
    expect(service).toBeTruthy();
  });
});
