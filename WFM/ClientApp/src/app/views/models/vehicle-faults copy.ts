export interface VehicleFaultsDto{
    id: string;
    vehicleId: string;
    code: string;
    critical: string;
    name: string;
    description: string;
    lastOccuredDate: string;
    status: boolean;
    issue: string;
}