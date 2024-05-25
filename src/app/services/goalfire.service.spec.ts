import { TestBed } from '@angular/core/testing';

import { GoalfireService } from './goalfire.service';

describe('GoalfireService', () => {
  let service: GoalfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
