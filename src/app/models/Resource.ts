import { ResourceType } from './ResourceType';
import { Location } from './Location';

export interface Resource {
  idResource: number;
  idTypeResource: ResourceType;
  idLocation: Location;
  parentResource: any;
  codNumber: string;
  capacity: number;
  price: number;
  isParking: boolean;
  pathImages: string;
  name: string;
  description: string;
}
