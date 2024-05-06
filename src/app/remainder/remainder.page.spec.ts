import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainderPage } from './remainder.page';

describe('RemainderPage', () => {
  let component: RemainderPage;
  let fixture: ComponentFixture<RemainderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
