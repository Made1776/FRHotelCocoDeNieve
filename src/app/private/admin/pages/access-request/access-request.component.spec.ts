import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRequestComponent } from './access-request.component';

describe('AccessRequestComponent', () => {
  let component: AccessRequestComponent;
  let fixture: ComponentFixture<AccessRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessRequestComponent]
    });
    fixture = TestBed.createComponent(AccessRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
