import { DateTime } from "@syncfusion/ej2-angular-charts";

export interface VehicleInspectionHistory{
  id: string;
  vehicleId: string;
  name: string;
  submitted: string;
  duration: string;
  date: string;
  inspectionForm: string;
  userId: string;
  userName: string;
  locationException: string;
  failedItems: string;
}