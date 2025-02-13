export interface LatitudeAndLongitude {
    Latitude: number;
    Longitude: number;
}

export interface LocationHistoryListingDto {
    traveledAt: Date;
    origin: LatitudeAndLongitude;
    destination: LatitudeAndLongitude[];
    placesTraveled: string[];
}