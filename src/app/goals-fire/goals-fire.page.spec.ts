import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalsFirePage } from './goals-fire.page';

describe('GoalsFirePage', () => {
  let component: GoalsFirePage;
  let fixture: ComponentFixture<GoalsFirePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
