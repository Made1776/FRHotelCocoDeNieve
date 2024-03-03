import { Type } from "@angular/core";
import { LocationCreate } from "./LocationCreate";
import { TypeResource } from "./TypeResource";

export interface ResourceCreate {
    idResource: number;
    idLocation: LocationCreate;
    idTypeResource: TypeResource;
    idDadResource: number;
    capacity: number;
    codNumber: string;
    content: string;
    price: number;
    isParking: boolean;
    pathImages: string;
    name: string;
    description: string;
}