import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemainderFirePage } from './remainder-fire.page';

describe('RemainderFirePage', () => {
  let component: RemainderFirePage;
  let fixture: ComponentFixture<RemainderFirePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainderFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
