import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MdbModalModule,
    ReactiveFormsModule,
    MdbFormsModule
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() data!: any;
  daysToDisableForm: FormGroup;

  constructor(
    public modalRef: MdbModalRef<ConfirmationDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.daysToDisableForm = new FormGroup({});
  }

  ngOnInit(): void {
      
  }

  buildForm() {
    this.daysToDisableForm = this.fb.group({
      nameTypeResource: ['', [Validators.required]]
    });
  }

  get nameTypeResourceField() {
    return this.daysToDisableForm.get('nameTypeResource');
  }

  setForm() {
    this.daysToDisableForm.patchValue({
      
    });
  }

  onNoClick(): void {
    this.modalRef.close(false); // User cancelled the operation
  }

  onYesClick(): void {
    this.modalRef.close(true); // User confirmed the operation
  }
}
