import { TestBed } from '@angular/core/testing';

import { BudgetfireService } from './budgetfire.service';

describe('BudgetfireService', () => {
  let service: BudgetfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
