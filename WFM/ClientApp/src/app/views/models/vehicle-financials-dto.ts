export interface VehicleFinancialsDto{
    id: string;
    vehicleId: string;
    inServiceDate: string;
    inServiceOdometer: string; 
    estimatedServiceLifeInMonths: number;
    estimatedServiceLifeInMiles: number;
    estimatedResaleValue: number;
    outOfServiceDate: string; 
    outOfServiceOdometer: string;
    purchaseVendor: string;
    purchasePrice: number;
    purchaseOdometer: string; 
    warrantyExpirationDate: string; 
    warrantyExpirationMeter: string; 
    purchaseComments: string;
}