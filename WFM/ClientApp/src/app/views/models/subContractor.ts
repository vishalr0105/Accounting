import { Guid } from "@syncfusion/ej2/pdf-export";

export interface SubContractorDto {
    id?: Guid; 
    companyId?: Guid; 
    subContractorName: string;
    industryTypeId?: string; 
    phoneNumber: string;
    websiteUrl: string;
    email: string;
    address?: string;
    mailingAddress?: string;
    city?: string;
    state?: string;
    mailingCity?: string;
    mailingZipcode?: string;
    mailingState?: string;
    zipCode?: string;
    countryId?: string; 
    mailingCountryId?: string; 
    legalInformation?: string;
    numberOfEmployees?: number; 
    numberOfFieldTechnicians?: number; 
    isActive: boolean; 
    taxRegistrationNumber?: string; 
    currency?: string;
    countryName?: string; 
    password:string
}
