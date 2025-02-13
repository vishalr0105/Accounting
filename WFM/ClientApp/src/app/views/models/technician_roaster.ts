import { DateTime } from "@syncfusion/ej2-angular-charts"
import { Guid } from "@syncfusion/ej2/pdf-export"

export class ShiftData {
    companyId: Guid
    shiftName: string
    shiftStartTime: string
    shiftEndTime: string
    id:Guid
     createdBy:string
     createdAt:DateTime
     updatedAt:DateTime
     updatedBy:string
     weekdays: string[]
     color:string
     subContractorId?:Guid
}