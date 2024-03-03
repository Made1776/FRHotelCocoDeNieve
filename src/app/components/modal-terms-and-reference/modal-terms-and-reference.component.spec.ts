import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTermsAndReferenceComponent } from './modal-terms-and-reference.component';

describe('ModalTermsAndReferenceComponent', () => {
  let component: ModalTermsAndReferenceComponent;
  let fixture: ComponentFixture<ModalTermsAndReferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalTermsAndReferenceComponent]
    });
    fixture = TestBed.createComponent(ModalTermsAndReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
