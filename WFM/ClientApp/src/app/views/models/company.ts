import { bankAccount } from "./bankAccount.model"
import { License } from "./license"
export class Company {
  id: string
  firstName: string = ""
  lastName: string = ""
  companyName: string = ""
  businessTypeId?: string
  industryTypeId?: string
  phoneNumber: string = ""
  websiteUrl?: string
  email: string = ""
  address: string = ""
  Departments: string = ""
  taxRegistrationNumber :  string = ""
  city: string = ""
  state: string = ""
  zipCode: string = ""
  countryId: string
  mailingAddress: string = ""
  mailingState: string = ""
  mailingCity: string = ""
  mailingZipcode: string = ""
  mailingCountryId: string
  // legalInformation?: string = ""
  image: string = ""
  // numberOfEmployees: string = ""
  numberofFieldTechnicians: number = 0
  numberofEmployees:number=0
  // subScriptionPlanId: string
  isActive: boolean = true
  paymentId: string
  taxeId: string
  mobileAppPin: boolean
  assetManagmentFeature: boolean
  customisableAssetRegister: boolean
  isReport: boolean
  invoices_Receipts: boolean
  isEmails: boolean
  currency?: string = ""
  username: string = ""
  password: string = ""
  confirmPassword: string = ""
  otherIndustryType: string = ""
  bankAccount : bankAccount[]
  license: any
  countryName: string
  createdAt:string
}
