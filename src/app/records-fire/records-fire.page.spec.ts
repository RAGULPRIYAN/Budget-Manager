import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordsFirePage } from './records-fire.page';

describe('RecordsFirePage', () => {
  let component: RecordsFirePage;
  let fixture: ComponentFixture<RecordsFirePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
