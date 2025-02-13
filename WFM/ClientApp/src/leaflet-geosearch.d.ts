declare module 'leaflet-geosearch' {
    import { Control } from 'leaflet';
  
    export class GeoSearchControl extends Control {
      constructor(options?: any);
    }
  
    export class OpenStreetMapProvider {
      constructor();
      search(query: string): Promise<any>;
    }
  }
  