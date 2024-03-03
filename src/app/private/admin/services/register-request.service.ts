import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { API_URL, API_VERSION } from 'src/constants/environment.const';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RegisterRequestService {
  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  private baseUrl = `${this.apiUrl}/${this.apiVersion}/registers-requests`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<RegisterRequest[]> {
    return this.http.get<RegisterRequest[]>(`${ this.baseUrl }`,);
  }

  getById(idRegisterRequest: number): Observable<RegisterRequest> {
    return this.http.get<RegisterRequest>(`${ this.baseUrl }/${ idRegisterRequest }`);
  }

  save(newRegisterRequest: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${ this.baseUrl }`, newRegisterRequest);
  }

  update(registerRequest: RegisterRequest, idRegisterRequest: number) {
    return this.http.put<RegisterRequest>(`${ this.baseUrl }/${idRegisterRequest}`, registerRequest);
  }

  approve_reject(approve: boolean, idRegisterRequest: number) : Observable<boolean>{
    return this.http.put<boolean>(`${ this.baseUrl }/approved-rejected?approve=${approve}&idRequest=${idRegisterRequest}`, null);
  }

  resendRegistrationToken(idRegisterRequest: number) : Observable<boolean>{
    return this.http.post<boolean>(`${ this.baseUrl }/link/${idRegisterRequest}`, null);
  }

  delete(idRegisterRequest: number) {
    return this.http.delete<any>(`${ this.baseUrl }/${idRegisterRequest}`);
  }
}
