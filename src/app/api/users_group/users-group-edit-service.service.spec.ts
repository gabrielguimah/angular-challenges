import { TestBed } from '@angular/core/testing';

import { UsersGroupEditServiceService } from './users-group-edit-service.service';

describe('UsersGroupEditServiceService', () => {
  let service: UsersGroupEditServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersGroupEditServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
