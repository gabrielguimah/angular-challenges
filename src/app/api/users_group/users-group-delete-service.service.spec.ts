import { TestBed } from '@angular/core/testing';

import { UsersGroupEditDeleteService } from './users-group-delete-service.service';

describe('UsersGroupEditDeleteService', () => {
  let service: UsersGroupEditDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersGroupEditDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
