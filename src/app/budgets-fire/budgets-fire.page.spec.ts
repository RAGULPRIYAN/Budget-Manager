import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetsFirePage } from './budgets-fire.page';

describe('BudgetsFirePage', () => {
  let component: BudgetsFirePage;
  let fixture: ComponentFixture<BudgetsFirePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
