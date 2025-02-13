export interface VehicleIssues{
    id: string;
    assigned: string;
    assignedvehiclename: string;
    issues: string;
    summary: string;
    reporteddate: Date; 
    labels: string;
    watchers: string;
    issuestatus: boolean;
}