import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageResourceComponent } from './modal-image-resource.component';

describe('ModalImageResourceComponent', () => {
  let component: ModalImageResourceComponent;
  let fixture: ComponentFixture<ModalImageResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalImageResourceComponent]
    });
    fixture = TestBed.createComponent(ModalImageResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
