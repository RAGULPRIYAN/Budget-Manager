import { TestBed } from '@angular/core/testing';

import { RemainderFireService } from './remainder-fire.service';

describe('RemainderFireService', () => {
  let service: RemainderFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemainderFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
