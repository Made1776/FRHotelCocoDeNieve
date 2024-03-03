import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAppComponent } from './registration-app.component';

describe('RegistrationAppComponent', () => {
  let component: RegistrationAppComponent;
  let fixture: ComponentFixture<RegistrationAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationAppComponent]
    });
    fixture = TestBed.createComponent(RegistrationAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
