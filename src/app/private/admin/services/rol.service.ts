import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/Role';
import { API_URL, API_VERSION } from 'src/constants/environment.const';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  private baseUrl = `${this.apiUrl}/${this.apiVersion}/roles`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${ this.baseUrl}`,);
  }

  save(newRol: Role): Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }`, newRol);
  }

  update(rol: Role) {
    return this.http.put<Role>(`${ this.baseUrl }`, rol);
  }

  delete(idRol: number) {
    return this.http.delete<any>(`${ this.baseUrl }/${ idRol }`);
  }
}
