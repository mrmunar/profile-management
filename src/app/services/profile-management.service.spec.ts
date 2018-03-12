import { TestBed, inject } from '@angular/core/testing';

import { ProfileManagementService } from './profile-management.service';

describe('ProfileManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileManagementService]
    });
  });

  it('should be created', inject([ProfileManagementService], (service: ProfileManagementService) => {
    expect(service).toBeTruthy();
  }));
});
