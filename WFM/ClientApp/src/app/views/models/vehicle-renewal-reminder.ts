export interface VehicleRenewalReminder{
    id: string;
    vehicleId: string;
    type: string;
    status: boolean;
    dueDate: string;
    notificationsEnabled: boolean;
    watchers: string;
}