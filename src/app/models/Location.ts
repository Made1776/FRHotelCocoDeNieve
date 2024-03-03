import { Region } from "./Region";

export interface Location{
    idLocation: number;
    idRegion: Region;
    place: string;
    floor: number;
    address: string;
}