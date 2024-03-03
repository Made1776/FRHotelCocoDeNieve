import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTypeResourceComponent } from './modal-type-resource.component';

describe('ModalTypeResourceComponent', () => {
  let component: ModalTypeResourceComponent;
  let fixture: ComponentFixture<ModalTypeResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTypeResourceComponent]
    });
    fixture = TestBed.createComponent(ModalTypeResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
