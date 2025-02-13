export interface VendorModel {
    vendorType: string
    firstName: string
    lastName: string
    companyName: string
    displayName: string
    email: string
    phoneNuWork: string
    mobileNu: string
    currency: string
    paymentTerms: string
    address: string
    city: string
    country: string
    zipCode: string
    id: string
    bankName:string
    brachAddress:string
    bankAccountType:string
    bankAccountNu:string
    routingNu:string
    accountHolderName:string
    createdBy: any
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface VendorDTO {
    vendorModel: VendorModel
    contactPersons: VendorContactPerson[]
  }

  export interface VendorContactPerson {
    fullName: string
    email: string
    phoneNu: any
    designation: any
    vendor: VendorModel
    vendorId: string
    id: string
    createdBy: any
    updatedBy: any
    createdAt: string
    updatedAt: string
  }