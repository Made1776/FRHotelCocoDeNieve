import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { environment } from "../../../../environments/environment.dev";
import { ReservationCreateDto } from "../../../models/dto/ReservationCreateDto";
import { SearchResourceDto } from "../../../models/dto/SearchResourceDto";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseURL = `${ environment.API_URL }/${ environment.API_VERSION }/reservations`;

  searchResourceDto: SearchResourceDto | null;
  idReservation: number | null;

  constructor(private httpClient: HttpClient) {
    this.searchResourceDto = null;
    this.idReservation = null;
  }

  getAll() {
    return this.httpClient.get<Reservation[]>(`${ this.baseURL }`,);
  }

  verifyAvailability(searchResourceDto: {
    idResource: number;
    startDate: Date;
    hours: number;
    minutes: number;
  }) {
    return this.httpClient.post<boolean>(`${ this.baseURL }/is-range-anticipation`, searchResourceDto);
  }

  

    create(reservation: ReservationCreateDto) {
    return this.httpClient.post<any>(`${ this.baseURL }`, reservation);
  }

  delete(idReservation: number) {
    return this.httpClient.delete<any>(`${ this.baseURL }/${ idReservation }`,);
  }
  


}
