import { TestBed, inject } from '@angular/core/testing';

import { AuthGurdService } from './auth-gurd.service';

describe('AuthGurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGurdService]
    });
  });

  it('should be created', inject([AuthGurdService], (service: AuthGurdService) => {
    expect(service).toBeTruthy();
  }));
});
