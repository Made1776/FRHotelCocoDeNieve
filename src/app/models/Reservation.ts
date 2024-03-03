import { Resource } from "./Resource";
import { User } from "./User";


export interface Reservation {
  idReservation: number;
  idResource: Resource;
  idUser: User;
  startDate: Date;
  endDate: Date;
  status: string;
}
