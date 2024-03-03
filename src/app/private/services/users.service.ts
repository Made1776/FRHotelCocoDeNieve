import { Injectable } from '@angular/core';
import { API_URL, API_VERSION, USER_NET_BOOKING } from "../../../constants/environment.const";
import { User } from "../../models/User";
import { BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]

  constructor(
    private http: HttpClient
  ) { }

  setUser(user: User | null) {
    this.user.next(user)
  }

  getFromLocalStorage(): User | null {
    const storedData = localStorage.getItem(USER_NET_BOOKING);
    return storedData ? JSON.parse(storedData) : null;
  }

  saveInLocalStorage(user: User) {
    localStorage.setItem(USER_NET_BOOKING, JSON.stringify(user));
  }

  clearLocalStorage() {
    localStorage.removeItem(USER_NET_BOOKING);
  }

  update(idUser: number, user: User) {
    return this.http.put<User>(`${ this.apiUrl }/${ this.apiVersion }/users/${idUser}`, user);
  }

  getAll(){
    return this.http.get<User[]>(`${ this.apiUrl }/${ this.apiVersion }/users`);
  }

  updateNotLocked(username: string, locked: boolean) {
    return this.http.put<User>(`${ this.apiUrl }/${ this.apiVersion }/users/active?valide=${locked}&username=${username}`, null);
  }
}
