import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserByRoleComponent } from './user-by-role.component';

describe('UserByRoleComponent', () => {
  let component: UserByRoleComponent;
  let fixture: ComponentFixture<UserByRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserByRoleComponent]
    });
    fixture = TestBed.createComponent(UserByRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
