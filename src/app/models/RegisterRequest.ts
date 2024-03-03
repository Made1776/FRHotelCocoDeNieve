import { PersonalData } from "./PersonalData";

export interface RegisterRequest {
    idRegisterRequest: number;
    personalData: PersonalData;
    requestDate: Date;
    status: string;
}