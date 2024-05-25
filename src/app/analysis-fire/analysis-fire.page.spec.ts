import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisFirePage } from './analysis-fire.page';

describe('AnalysisFirePage', () => {
  let component: AnalysisFirePage;
  let fixture: ComponentFixture<AnalysisFirePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
