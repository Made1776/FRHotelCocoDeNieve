import { PersonalData } from "./PersonalData";

export interface User {
  idUser: number
  personalData: PersonalData
  username: string
  dateEntry: string
  dateLastLogin: string
  active: boolean
  notLocked: boolean
}


