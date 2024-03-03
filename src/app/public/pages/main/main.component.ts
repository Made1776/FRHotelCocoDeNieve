import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from "../../../auth/services/auth.service";
import { AlertHandler } from "../../../utils/AlertHandler";
import { AlertType } from "../../../models/Enums/AlertType.enum";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onLogin() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['user/home']).then();
      return;
    }

    this.router.navigate(['auth/login']).then();
  }

  onSendRequest() {
    this.router.navigate(['auth/registration-application']).then();
  }

}
