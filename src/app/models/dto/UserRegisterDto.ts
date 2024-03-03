import { PersonalData } from "../PersonalData";

export interface UserRegisterDto {
  username: string;
  password: string;
  personalData: PersonalData;
}
