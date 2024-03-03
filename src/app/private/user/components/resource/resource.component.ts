import { Component, Input } from '@angular/core';
import { Resource } from "../../../../models/Resource";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ModalReserveResourceComponent } from "../modal-reserve-resource/modal-reserve-resource.component";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent {

  @Input() resource: Resource
  modalRef: MdbModalRef<ModalReserveResourceComponent> | null

  constructor(private modalService: MdbModalService) {
    this.resource = {} as Resource;
    this.modalRef = null;
  }

  onOpenModalReserveResource() {
    this.modalRef = this.modalService.open(ModalReserveResourceComponent,
      {
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,
        data: {
          resource: this.resource
        }
      })
  }


}
