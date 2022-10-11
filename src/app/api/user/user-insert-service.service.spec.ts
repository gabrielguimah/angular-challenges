import { TestBed } from '@angular/core/testing';

import { UserInsertServiceService } from './user-insert-service.service';

describe('UserInsertServiceService', () => {
  let service: UserInsertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInsertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
