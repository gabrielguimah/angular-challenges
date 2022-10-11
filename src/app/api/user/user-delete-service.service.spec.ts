import { TestBed } from '@angular/core/testing';

import { UserEditDeleteService } from './user-delete-service.service';

describe('UserEditDeleteService', () => {
  let service: UserEditDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEditDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
