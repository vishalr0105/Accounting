import { Stream } from "stream";

export interface vehicle {

    id : string,
    name: string;
    type: string;
    vin: number;
    status: boolean;
    // StatusFormatted:string;
    ownership: string;
    image: string;
    lpn: number;
    ownerShip?:string;
  }
