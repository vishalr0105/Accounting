import { Company } from './company';

export class Vendor {
  serviceCity: string;
  serviceState: string;
  serviceCountry: string;
  companyID: string;
  account_Type: string;
  accountType: string;
  activityStatus: string = 'Active';
  Name: string;
  RegisterNumber:string
  ContactPerson: string;
  EmailID: string;
  PhoneNo: string;
  Website: string;
  Address: string;
  zipCodeID: string;
  serviceAddress: string;
  serviceAddressZipcodeId: string;
  latitudeOffice: any;
  longitudeOffice: any;
  latitudeService: any;
  longitudeService: any;
  id: string;
  createdBy: string;
  updatedBy: any;
  createdAt: string;
  updatedAt: string;
  name: string;
  phoneNo:string;
  emailID:string;
  contactPerson: string;


}

export class VendorDto{
  Vendor:Vendor

}


export class ActivityStatus {
  id: string;
  activityStatus: string;
}

export class ContactLogs {
  company: Company;
  companyId: string;
  description: string;
  time: string;
  contact: any;
  contactId: string;
  id: string;
  createdBy: string;
  updatedBy: any;
  createdAt: string;
  updatedAt: string;
}

export class Contacts {
  id: string;
  companyID: string;
  company_name: string;
  account_Name: string;
  accountId: string;
  activityStatus: string = 'Active';
  contactName: string;
  designation: string;
  department: string;
  emailID: string;
  mobileNumber: string;
  alternateMobileNumber: string;
  birthday: string;
  notes: string;
  updatedAt: Date;
  createdAt: Date;
  allowCustomerPortal: boolean;
}
export class point {
  lat: number;
  lng: number;
}
