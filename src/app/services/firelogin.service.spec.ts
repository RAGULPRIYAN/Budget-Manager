import { TestBed } from '@angular/core/testing';

import { FireloginService } from './firelogin.service';

describe('FireloginService', () => {
  let service: FireloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
