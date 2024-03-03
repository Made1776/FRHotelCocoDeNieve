import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from "../services/token.service";
import { UsersService } from "../../private/services/users.service";
import { RegionService } from "../../private/admin/services/region.service";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private regionService: RegionService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isUserLoggedIn()) {
      this.usersService.setUser(this.usersService.getFromLocalStorage());
      this.regionService.currentRegion = this.regionService.getFromLocalStorage();
      return true;
    }

    this.router.navigate(['/auth/login']).then();
    return false;
  }
}

