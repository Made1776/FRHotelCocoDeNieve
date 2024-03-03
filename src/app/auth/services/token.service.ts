import { Injectable } from '@angular/core';
import { TOKEN_NET_BOOKING } from "../../../constants/environment.const";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  get() {
    return localStorage.getItem(TOKEN_NET_BOOKING);
  }

  save(token: string) {
    localStorage.setItem(TOKEN_NET_BOOKING, token);
  }

  remove() {
    localStorage.removeItem(TOKEN_NET_BOOKING);
  }

}
