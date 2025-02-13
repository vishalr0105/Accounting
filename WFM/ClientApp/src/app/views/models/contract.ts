import { StringTokenizer } from "@syncfusion/ej2/pdf-export";
import { AssetMenagment } from "./assetMenagment";
import { Company } from "./company";

export class Contract {
  id: string;
  companyId: string | null;
  companyName: string;
  account_Name: string;
  accountNameId: string;
  contractNo: string;
  createdAt:Date;
  customerPurchaseOrder: string;
  description:string;
  account_Manager: string;
  quoteId:string
  status:string;
  address:string
  accountManagerId: string;
  contractEffectiveDate: string;
  contractType:string;
  contractStartDate: string;
  contractEndDate: string;
  quantity: number;
  contractPrice: number;
  tax: number;
  totalPrice: number;
  contractAndAssets: ContractAndAssetsLink[] = [];
  contractAndPpm: ContractsAndPPM[] = [];
  contractAndSla: ContractAndSla[] = [];
  ppmSchedules: PPMShedule[] = [];
  contractAndServiceLink:ContractAndServices[] = []
  contractAndContacts:contractAndContacts[] = []
  contractAndParts:contractAndParts[] = []
}

export interface contractAndParts{
  id?:string
  partId:string,
  contractId?:string,
  quantity:number,
  total:number,
  partName:string,
  unitPrice:number,
  qtyAvailable?:number,
}

export interface ContractAndServices{
  id?:string
  serviceId:string
  serviceName?:string
  quantity:number
  unitPrice?:number
  total?:number
  contractId?:string
}

export interface contractAndContacts{
  id?:string;
  contractId?:string;
  contactId:string;
  contactName?:string;
  email?:string;
  designation?:string;
  mobileNo?:string;
}

export interface ContractAndQuotes{
  id?:string
  quoteId:string
  quote_Id?:string;
  status?:string;
  appointment_ID?:string;
  client?:string;
  company?:string;
  value?:number
  taxes?:number;
  quoteName?:string
  contractId?:string
}

export interface ContractAndAssetsLink {
  id?: string;
  assetName?:string;
  contractId?: string;
  assetId?:string
  contract?: Contract;
  customerAssetsId: string;
  customerAssets?: AssetMenagment;
  companyId?: string;
  quantity?: number;
  unitPrice?: number;
  model?:string
}


export class PPMShedule {
  id?: string;
  companyId?: string | null;
  company?: Company;
  assetId:string;
  serviceId:string;
  assetName:string
  ppmScheduleName: string;
  startDate: string;
  endDate: string;
  contractId?: string;
  notes:string;
  repeatFrequency: number;
  repeatFrequencyMetric?: string;
  repeatFrequencyMetricId: string;
}

export interface RepeatFrequencyMetric {
  id?: string;
  companyId?: string | null;
  company: Company;
  repeatFrequencyMetrics: string;
}


export interface ContractsAndPPM {
  id?: string
  scheduleName?:string
  stopDate?:Date
  frequency?:string
  serviceFor?:string
  companyId?: string
  contractId?: string;
  pPMSheduleId?: string;
}

export interface ContractAndSla {
  id?: string
  companyId?: string | null;
  company?: Company;
  contractId?: string;
  contract?: Contract;
  // sla?: ServiceLevelAgreement;
  slaId: string;
  slaMatric:string
  slaMatricType:string
  value:string
}

