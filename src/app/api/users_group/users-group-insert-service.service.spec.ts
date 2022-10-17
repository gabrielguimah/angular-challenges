import { TestBed } from '@angular/core/testing';

import { UsersGroupInsertServiceService } from './users-group-insert-service.service';

describe('UsersGroupInsertServiceService', () => {
  let service: UsersGroupInsertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersGroupInsertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
