import { TestBed } from '@angular/core/testing';

import { UsersGroupListServiceService } from './users-group-list-service.service';

describe('UsersGroupListServiceService', () => {
  let service: UsersGroupListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersGroupListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
