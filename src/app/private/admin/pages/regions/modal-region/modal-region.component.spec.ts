import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegionComponent } from './modal-region.component';

describe('ModalRegionComponent', () => {
  let component: ModalRegionComponent;
  let fixture: ComponentFixture<ModalRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRegionComponent]
    });
    fixture = TestBed.createComponent(ModalRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
