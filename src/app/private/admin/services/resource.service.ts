import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/models/Resource';
import { ResourceCreate } from 'src/app/models/ResourceCreate';
import { environment } from "../../../../environments/environment.dev";
import { SearchResourceDto } from 'src/app/models/dto/SearchResourceDto';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseURL = `${environment.API_URL}/${environment.API_VERSION}/resources`;

  isSearchDone: boolean;
  isEditing: boolean;

  constructor(private httpClient: HttpClient) {
    this.isSearchDone = false;
    this.isEditing = false;
  }


  getAll(): Observable<Resource[]> {
    return this.httpClient.get<Resource[]>(`${ this.baseURL }`,);
  }

  getAllByRegionId(id: number): Observable<Resource[]> {
    return this.httpClient.get<Resource[]>(`${ this.baseURL }/by-region-id/${ id }`,);
  }

  save(resource: ResourceCreate): Observable<any> {
    return this.httpClient.post<any>(`${ this.baseURL }`, resource,);
  }

  update(resource: ResourceCreate, idResource: number) {
    return this.httpClient.put<any>(`${ this.baseURL }/${ idResource }`, resource,);
  }

  delete(idResource: number) {
    return this.httpClient.delete<any>(`${ this.baseURL }/${ idResource }`,);
  }

  findAvailable(searchResourceDto: SearchResourceDto) {
    return this.httpClient.post<any>(`${ this.baseURL }/availables`, searchResourceDto);
  }

  findById(idResource: number) {
    return this.httpClient.get<any>(`${ this.baseURL }/${ idResource }`);
  }



}
