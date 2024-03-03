import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeResourcesComponent } from './type-resources.component';

describe('TypeResourcesComponent', () => {
  let component: TypeResourcesComponent;
  let fixture: ComponentFixture<TypeResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeResourcesComponent]
    });
    fixture = TestBed.createComponent(TypeResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
