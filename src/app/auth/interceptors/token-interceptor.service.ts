import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from "../services/token.service";
import { environment } from "../../../environments/environment.dev";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addApiKey(request);
    request = this.addToken(request)
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.tokenService.get();
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return request;
  }

  private addApiKey(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const apiKey = environment["API_KEY"];
    if (apiKey) {
      request = request.clone({
        setHeaders: { 'X-API-Key': `${apiKey}` }
      });
    }
    return request;
  }
}
