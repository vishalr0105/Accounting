import { Guid } from "@syncfusion/ej2/pdf-export";

export interface KPIManagement {
    id?: string;
    subContractorId: string; // This should be a string (ID from the backend)
   // companyId: string; // Same as above
    goals: string; // The goal description
    percentages: number; // Percentage (if required)
    subContractorName?:string;
}
