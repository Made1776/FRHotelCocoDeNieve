import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss']
})
export class NotificationBellComponent {

}
