import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-image-resource',
  templateUrl: './modal-image-resource.component.html',
  styleUrls: ['./modal-image-resource.component.scss']
})
export class ModalImageResourceComponent {

  @Input() imageUrl: string | null = null;
  @Input() imageTitle: string | null = null;

  constructor(public modalRef: MdbModalRef<ModalImageResourceComponent>) {}
  
}
