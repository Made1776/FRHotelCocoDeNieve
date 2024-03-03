import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/Menu';
import { API_URL, API_VERSION } from 'src/constants/environment.const';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  private baseUrl = `${this.apiUrl}/${this.apiVersion}/menus`;

  constructor(
    private http: HttpClient
  ) { }

  getAllFirstLevel(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${ this.baseUrl}/listarPrimerNivel`,);
  }

  getAllByMenuParent(idParentMenu: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${ this.baseUrl }/listarHijos/${idParentMenu}`,);
  }

  save(newMenu: Menu): Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }`, newMenu);
  }

  update(menu: Menu, idMenu: number) {
    return this.http.put<Menu>(`${ this.baseUrl }/${ idMenu }`, menu);
  }

  delete(idMenu: number) {
    return this.http.delete<any>(`${ this.baseUrl }/${ idMenu }`,);
  }

  getMenuById(idMenu: number): Observable<Menu> {
    return this.http.get<Menu>(`${ this.baseUrl }/${ idMenu }`);
  }
}
