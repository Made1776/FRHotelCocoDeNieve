import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolUser } from 'src/app/models/RolUser';
import { API_URL, API_VERSION } from 'src/constants/environment.const';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserRolService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  private baseUrl = `${this.apiUrl}/${this.apiVersion}/roles-users`;

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<RolUser[]> {
    return this.http.get<RolUser[]>(`${ this.baseUrl}`,);
  }

  listByIdUser(idUser: number): Observable<RolUser[]> {
    return this.http.get<RolUser[]>(`${ this.baseUrl }/user/${ idUser }`);
  }

  listByIdRol(idRol: number): Observable<RolUser[]> {
    return this.http.get<RolUser[]>(`${ this.baseUrl }/listarporrol/${ idRol }`);
  }

  save(newUserRol: RolUser): Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }`, newUserRol);
  }

  update(rolUser: RolUser) {
    return this.http.put<RolUser>(`${ this.baseUrl }`, rolUser);
  }

  delete(rolUser: RolUser) {
    const options = {
      body: rolUser
    };
    return this.http.delete<any>(`${ this.baseUrl }`, options);
  }

  saveList(rolUserList: RolUser[], idUser: number) {
    return this.http.post<any>(`${ this.baseUrl }/rol/${idUser}`, rolUserList);
  }
}
