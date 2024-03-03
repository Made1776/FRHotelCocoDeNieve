import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {NotificationBellComponent} from "../notification-bell/notification-bell.component";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../models/User";
import {UsersService} from "../../services/users.service";
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatButtonModule, NotificationBellComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter<boolean>();
  isToggled = false;
  user: User | null
  currentRol: string = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private location: Location,
    private router: Router
  ) {
    this.user = null;
  }

  ngOnInit() {
    this.usersService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      }
    });

    const currentPath = this.location.path().split('/');

    if (currentPath[1] === 'user') {
      this.currentRol = 'user';
    }
    if (currentPath[1] === 'admin') {
      this.currentRol = 'admin';
    }

  }

  toggleMenu() {
    this.isToggled = !this.isToggled;
    this.toggleSideNav.emit(this.isToggled);
  }

  onLogout() {
    this.authService.performLogout();
  }

  onProfile() {
    this.router.navigate([this.currentRol, `profile-settings`]).then();
  }

}
