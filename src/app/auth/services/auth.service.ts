import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment.dev";
import { API_URL, API_VERSION } from "../../../constants/environment.const";
import { User } from "../../models/User";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { UsersService } from "../../private/services/users.service";
import { tap } from "rxjs";
import { UserRegisterDto } from "../../models/dto/UserRegisterDto";
import { RegionService } from "../../private/admin/services/region.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  private url = `${ this.apiUrl }/${ this.apiVersion }`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private usersService: UsersService,
    private regionService: RegionService
  ) { }

  private handleLoginResponse(res: HttpResponse<User>): void {
    const token = res.headers.get('Jwt-Token');

    if (!token) {
      throw new Error('Token not found in headers');
    }

    this.tokenService.save(token);

    if (!res.body) {
      throw new Error('User data not found in response body');
    }

    this.usersService.setUser(res.body);
    this.usersService.saveInLocalStorage(res.body);
  }

  performLogin(email: string, password: string, rol: string) {
    return this.http.post<User>(`${ this.url }/users/login`, {
      username: email,
      password,
      rol
    }
    , { observe: 'response' }).pipe(
      tap((res: HttpResponse<User>) => this.handleLoginResponse(res)
      )
    );
  }

  performLogout() {
    this.tokenService.remove();
    this.usersService.setUser(null);
    this.usersService.clearLocalStorage();
    this.regionService.clearLocalStorage()
    this.router.navigate(['']).then();
  }

  performRegister(user: UserRegisterDto) {
    return this.http.post(`${ this.url }/users/register`, user);
  }

  isUserLoggedIn() {
    return !!this.tokenService.get();
  }
}

