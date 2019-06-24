import { TestBed } from '@angular/core/testing';

import { CameraProviderService } from './camera-provider.service';

describe('CameraProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CameraProviderService = TestBed.get(CameraProviderService);
    expect(service).toBeTruthy();
  });
});
