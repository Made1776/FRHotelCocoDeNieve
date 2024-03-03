// alert.component.ts
import { Component } from '@angular/core';
import { AlertHandler } from '../../AlertHandler';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <div *ngIf="alerts.length > 0" class="alert-dialog">
      <div
        *ngFor="let alert of alerts"
        [@fadeInOut]="alert ? 'visible' : 'hidden'"
        class="alert"
        [ngClass]="['alert-' + alert.type]"
        role="alert"
      >
        <i [ngClass]="['fas pe-2', iconClass(alert.type)]"></i> {{ alert.message }}
      </div>
    </div>
  `,
  styles: [
    `
      .alert-dialog {
        position: fixed;
        top: 0;
        left: 50%;
        margin: 1rem;
        z-index: 1050;
      }

      .alert {
        opacity: 0;
        transform: translateY(0);
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        margin-bottom: 0.5rem;
      }

      .visible {
        opacity: 1;
        transform: translateY(0);
      }
    `,
  ],
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({ opacity: 0, transform: 'translateY(-50%)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('500ms ease-in')),
      transition('visible => hidden', animate('500ms ease-out')),
    ]),
  ],
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ]
})
export class AlertComponent {

  get alerts() {
    return AlertHandler.getActiveAlerts();
  }

  iconClass(type: string) {
    const iconClasses: {[key: string]: string} = {
      success: 'fa-check-circle text-success',
      danger: 'fa-times-circle text-danger',
      info: 'fa-info-circle text-info',
      warning: 'fa-exclamation-circle text-warning',
    };

    return type ? iconClasses[type] : '';
  }
}
