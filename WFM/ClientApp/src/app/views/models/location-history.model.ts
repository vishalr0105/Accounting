export interface locationhistorymodel{
    Id: String;
  VehicleId: String; 
  Name: String;
  Description: String;
  Address: String;
  OriginLongitude: Number;
  OriginLatitude: Number;
  DestinationLatitude: Number;
  DestinationLongitude: Number;
  GeoFenceRadius: Number;
  CountryCode: String;
  TraveledAt: String;
}