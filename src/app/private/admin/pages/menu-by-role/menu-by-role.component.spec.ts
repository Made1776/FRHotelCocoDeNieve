import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuByRoleComponent } from './menu-by-role.component';

describe('MenuByRoleComponent', () => {
  let component: MenuByRoleComponent;
  let fixture: ComponentFixture<MenuByRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuByRoleComponent]
    });
    fixture = TestBed.createComponent(MenuByRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
