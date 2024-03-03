import { Region } from "./Region";

export interface LocationCreate{
    idLocation?: number;
    idRegion: Region;
    place: string;
    floor: number;
    address: string;
}