import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuRol } from 'src/app/models/MenuRol';
import { API_URL, API_VERSION } from 'src/constants/environment.const';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MenuRolService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  private baseUrl = `${this.apiUrl}/${this.apiVersion}/menus-roles`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<MenuRol[]> {
    return this.http.get<MenuRol[]>(`${ this.baseUrl}`,);
  }

  getById(idRol: number): Observable<MenuRol[]> {
    return this.http.get<MenuRol[]>(`${ this.baseUrl }/${ idRol }`);
  }

  save(newMenuRol: MenuRol): Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }`, newMenuRol);
  }

  update(menuRol: MenuRol) {
    return this.http.put<MenuRol>(`${ this.baseUrl }`, menuRol);
  }

  delete(menuRol: MenuRol) {
    const options = {
      body: menuRol
    };
    return this.http.delete<any>(`${ this.baseUrl }`, options);
  }

  saveList(menuRol: MenuRol[]) {
    return this.http.post<any>(`${ this.baseUrl }/menu`, menuRol);
  }
}
