import { TestBed } from '@angular/core/testing';

import { UsersGroupReadService } from './users-group-read.service';

describe('UsersGroupReadService', () => {
  let service: UsersGroupReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersGroupReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
