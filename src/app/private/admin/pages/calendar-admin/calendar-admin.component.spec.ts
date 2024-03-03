import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAdminComponent } from './calendar-admin.component';

describe('CalendarAdminComponent', () => {
  let component: CalendarAdminComponent;
  let fixture: ComponentFixture<CalendarAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarAdminComponent]
    });
    fixture = TestBed.createComponent(CalendarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
