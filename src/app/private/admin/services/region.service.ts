import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from 'src/app/models/Region';
import { environment } from "../../../../environments/environment.dev";
import { REGION_NET_BOOKING } from "../../../../constants/environment.const";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  currentRegion: Region | null;
  private baseURL = environment.API_URL + '/' + environment.API_VERSION + '/regions';

  constructor(private httpClient: HttpClient) {
    this.currentRegion = null;
  }


  getAll(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(`${ this.baseURL }`);
  }

  // getAll(): Observable<Region[]> {
  //   const headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${ 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBZG1pbmlzdHJhY2nDs24gZGUgbGEgcGxhdGFmb3JtYSBkZSByZXNlcnZhcyBkZSByZWN1cnNvcyIsInN1YiI6IjE3MDM3OTQ2MjYiLCJpc3MiOiJQbGF0YWZvcm1hIGRlIHJlc2VydmFzIGRlIHJlY3Vyc29zIiwicGVybWlzb3MiOltdLCJleHAiOjE3MDIwOTQ0NDksImlhdCI6MTcwMTY2MjQ0OX0.zUnryoOntmH0tI53m7ccVeXVBBRu4ooUYJzxFM87SI90XIGSqUNcQRH5jhowu049WORgwpShue3e-NWzn4rCAQ' }` });
  //   return this.httpClient.get<Region[]>(`${ this.baseURL }`, { headers });
  // }

  save(region: Region): Observable<Region> {
    return this.httpClient.post<Region>(`${ this.baseURL }`, region);
  }

  update(idRegion: number, region: Region): Observable<Region> {
    return this.httpClient.put<Region>(`${ this.baseURL }/${ idRegion }`, region);
  }

  delete(idRegion: number): Observable<any> {
    return this.httpClient.delete<any>(`${ this.baseURL }/${ idRegion }`);
  }

  saveInLocalStorage(region: Region) {
    localStorage.setItem(REGION_NET_BOOKING, JSON.stringify(region));
  }

  getFromLocalStorage(): Region | null {
    const storedData = localStorage.getItem(REGION_NET_BOOKING);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearLocalStorage() {
    this.currentRegion = null;
    localStorage.removeItem(REGION_NET_BOOKING);
  }

}
