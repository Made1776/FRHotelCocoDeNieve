import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReserveResourceComponent } from './modal-reserve-resource.component';

describe('ModalReserveResourceComponent', () => {
  let component: ModalReserveResourceComponent;
  let fixture: ComponentFixture<ModalReserveResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalReserveResourceComponent]
    });
    fixture = TestBed.createComponent(ModalReserveResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
