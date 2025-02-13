import { AppointmentDocument } from "./appointment.model"

export class InsurenceDetails {
    nameInsurance: string
    insuranceProvider: string
    insuranceType: string
    nameInsurancecompany: string
    businessAddress: string
    policyNumber: string
    insurenceAgency: string
    termStartDate: string
    termEndDate: string
    agentName: string
    agentContactNumber: string
    agencyAddress: string
    longitudeOffice:string;
    latitudeOffice:string;
    attachments: any[]
}