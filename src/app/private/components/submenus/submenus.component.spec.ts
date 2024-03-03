import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenusComponent } from './submenus.component';

describe('SubmenusComponent', () => {
  let component: SubmenusComponent;
  let fixture: ComponentFixture<SubmenusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmenusComponent]
    });
    fixture = TestBed.createComponent(SubmenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
