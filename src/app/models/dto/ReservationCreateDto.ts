export interface ReservationCreateDto {
  idReservation?: number;
  idResource: number;
  idUser: number;
  startDate: Date;
  hours: number;
  minutes: number;
  status: string;
}
