import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceType } from 'src/app/models/ResourceType';
import { environment } from "../../../../environments/environment.dev";
import { SearchResourceDto } from "../../../models/dto/SearchResourceDto";

@Injectable({
  providedIn: 'root'
})
export class ResourceTypeService {

  private baseURL = environment.API_URL + "/" + environment.API_VERSION + "/type-resources";

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<ResourceType[]> {
    return this.httpClient.get<ResourceType[]>(`${ this.baseURL }`,);
  }

  create(typeResource: ResourceType): Observable<any> {
    console.log(typeResource);
    return this.httpClient.post<any>(`${ this.baseURL }`, typeResource);
  }

  update(typeResource: ResourceType, idTypeResource: number) {
    console.log(typeResource);
    return this.httpClient.put<any>(`${ this.baseURL }/${ idTypeResource }`, typeResource);
  }

  delete(idTypeResource: number) {
    return this.httpClient.delete<any>(`${ this.baseURL }/${ idTypeResource }`);
  }


}
