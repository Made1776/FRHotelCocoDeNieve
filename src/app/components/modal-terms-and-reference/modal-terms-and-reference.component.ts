import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { MdbCarouselModule } from "mdb-angular-ui-kit/carousel";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MdbCheckboxModule } from "mdb-angular-ui-kit/checkbox";

@Component({
  selector: 'app-modal-terms-and-reference',
  standalone: true,
  imports: [CommonModule, MdbCarouselModule, MatTabsModule, MatIconModule, MdbCheckboxModule],
  templateUrl: './modal-terms-and-reference.component.html',
  styleUrls: ['./modal-terms-and-reference.component.scss']
})
export class ModalTermsAndReferenceComponent {

  videoWidth: number = 0;
  videoHeight: number = 0;
  isMinimumPlayTime: boolean = false;

  videoMinTime = 0;
  currentVideoTime = 0;
  timeLeft: number = this.videoMinTime;
  isCheckTerms: boolean = false;

  constructor(
    public modalRef: MdbModalRef<ModalTermsAndReferenceComponent>
  ) {
    this.videoHeight = window.innerHeight * 0.5;
    this.videoWidth = window.innerWidth * 0.5;
  }


  updateTime(event: any) {
    this.currentVideoTime = event.target.currentTime;
    this.timeLeft = this.videoMinTime - this.currentVideoTime;

    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
    }

    if (this.currentVideoTime >= this.videoMinTime) {
      this.isMinimumPlayTime = true;
    }

  }

  checkTerms(event: any) {
    this.isCheckTerms = event.target.checked;
  }

  onRegister() {
    this.modalRef.close(this.isCheckTerms);
  }
}
