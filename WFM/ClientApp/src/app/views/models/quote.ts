// export class Quote2 {
//   id?: string;
//   quoteID: number;
//   jobDefinitionId: string;
//   discount: number;
//   deposit: number;
//   appointmentId: string;
//   clientAndSuppliersId: string = '';
//   clientAndSuppliersName: string;
//   companyEmail: string;
//   serviceAddress: string;
//   billingAddress: string;
//   quoteSubject: string;
//   clientPurchaseOrderNo: string;
//   products: Product[];
//   clientMessage: string;
//   status: string = 'Draft';
//   createdAt: string;
//   cost: number = 0;
//   sell: number;
//   margin: number;
//   tax: number;
//   valueIncTax: number;
//   createBy: string;
//   jobNo: string;
//   lostQuoteReason: string;
//   prefferedDate: any;
//   prefferedTime: string = '';
//   prefferedDateTime: any;
//   notes: string;
//   services: QuoteServiceItem[] = [];
//   materials: QuoteMaterial[] = [];
//   slaId: string = '';
//   slaName: string;
//   assets: QuoteAssets[] = [];
//   paymentType: string = '';
//   companyId: string;
// }

export class Quote {
  id?: string;
  isApproved:boolean
  isRejected:boolean
  companyId: String;
  companyLogo:string;
  quoteNumber:number;
  createdAt:Date
  companyEmail:string
  companyAddress:string
  companyName: string;
  accountNameId: string;
  appointment_Id:string;
  appointmentID: string;
  contactNameId: string;
  contact_Name: string;
  contact_Address:string;
  contact_Email:string;
  account_name:string;
  account_company:string;
  accountZipCode:string
  quoteJobsId: string;
  totalJobCost: string;
  totalPartsCost: number;
  currencyType: string;
  taxrates: number;
  validTillDays:number;
  totalQuoteValue: number;
  notes: string;
  services: QuoteServiceItem[] = [];
  materials: QuoteMaterial[] = [];
  assets: QuoteAssets[] = [];
  sla:QuoteAndSla[] = []
  status: string;
  serviceDiscount:number;
  materialDiscount:number;
  effectiveServiceTotal:number;
  effectiveMaterialTotal:number;
  materialTotal:number;
  serviceTotal:number;
  logisticCtc:number;
  labourCtc:number;
  createdBy:string
}

export class QuoteAndSla{
        id?:string;
        quoteId?:string;
        slaId:string;
        slanName:string;
        slaMatric:string;
        matricType:string
        value?:string;
}

export class QuoteServiceItem {
  id?: string;
  serviceId: string = '';
  name: string;
  unitPrice: number;
  description: string;
  serviceDiscount:number;
  duration?:number;
  quantity:number;
  total: number = 0;
  quoteId?: string;
  jobMin?:number
  jobHrs?:number
  resource?:number;

  constructor(
    serviceId?: string,
    name?: string,
    unitPrice?: number,
    description?: string,
    total?: number
  ) {
    this.serviceId = serviceId || '';
    this.name = name;
    this.unitPrice = unitPrice;
    this.description = description;
    this.total = total;
  }
}

export class QuoteMaterial {
  id?: string;
  materialId: string = '';
  name: string;
  qty: number;
  unitPrice: number;
  available_Quantity?:number;
  total: number = 0;
  description: string;
  quoteId?: string;

  constructor(
    materialId?: string,
    name?: string,
    qty?: number,
    unitPrice?: number,
    total?: number,
    description?: string
  ) {
    this.materialId = materialId || '';
    this.name = name;
    this.qty = qty;
    this.unitPrice = unitPrice;
    this.description = description;
    this.total = total;
  }
}

export class QuoteAssets {
  id?: string;
  assetId: string = '';
  assetName: string;
  modelNumber?:string;
  quantity?:number;
  asset_Type?:string;
  status?:string
  unitOfMeasurement: string = '';
  unitOfMeasurementValue: string;
  quoteId?: string;

  constructor(
    assetId?: string,
    assetName?: string,
    unitOfMeasurement?: string,
    unitOfMeasurementValue?: string
  ) {
    this.assetId = assetId || '';
    this.assetName = assetName;
    this.unitOfMeasurement = unitOfMeasurement || '';
    this.unitOfMeasurementValue = unitOfMeasurementValue;
  }
}
