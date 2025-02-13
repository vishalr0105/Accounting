
import { Company } from "./company";

export class Account{
    company_Name: any
    billingCity:string;
    billingState:string
    billingCountry:string
    serviceCity:string;
    serviceState:string
    serviceCountry:string
     siteCity:string;
     siteState:string
     siteCountry:string
    companyID: string
    account_Type: string
    accountType: string
    activityStatus: string = "Active"
    accountName: string
    companyEmailID: string
    companyPhoneNo: string
    companyWebsite: string
    officeAddress: string
    zipCodeID: string
    serviceAddress: string
    siteAddress:string
    serviceAddressZipcodeId: string
    latitudeOffice: any
    longitudeOffice: any
    latitudeService: any
    longitudeService: any
    latitudeSite: any
     longitudeSite: any
    id: string
     siteName:string
     siteId:number
    sitelocation:string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
    siteTable: Sites[];
}

export class Sites {
    siteName: string;
    siteId: string;
    siteAddress: string;
    siteCity: string;
    siteState: string;
    siteCountry: string;
    zipCodeID: string;
     accountId:string;
    companyId:string;
    latitudeSite: any;
     longitudeSite: any
    //  createdBy: string
    // updatedBy: any
    // createdAt: string
    // updatedAt: string
    // Add any other necessary properties
  }

export class AccountDto{
    account:Account
    contacts:Contacts[]
}

export class ActivityStatus{
    id:string
    activityStatus:string
}

export class ContactLogs{

    company: Company
    companyId: string
    description: string
    time: string
    contact: any
    contactId: string
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string

}

export class Contacts{
    id: string
    companyID: string
    company_name:string
    account_Name:string
    accountId: string
    activityStatus: string = "Active"
    contactName: string
    designation: string
    department: string
    emailID: string
    mobileNumber: string
    alternateMobileNumber: string
    birthday: string
    notes: string
    updatedAt:Date
  createdAt: Date
  allowCustomerPortal: boolean
 
}
export class point {
    lat: number;
    lng: number;
  }
