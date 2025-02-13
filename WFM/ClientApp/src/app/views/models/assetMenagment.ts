

export class AssetMenagment {
  id: string;
  assetName: string;
  assetTypeId:string;
  asset_Type: string;
  assetId:string;
  accountNameId: string;
  account_Name: string;
  assetImage: string;
  assetLocation: string;
  siteName:string;
  siteLocation:string
  manufacturer: string;
  modelNumber: string;
  notes: string;
  companyName:string;
  quantity:number;
  assetStatus:string;
  asset_status:string;
  equipmentClassId: string;
  equipmentClass: string;
  equipmentNumber: string;
  equipmentCategoryId: string;
  equipmentCategory: string;
  description: string;
  warrantyTypeId: string;
  warrantyStartDate: Date
  warranty_Type: string;
  warrantyEndDate: Date;
  underWarranty: boolean;
  warrantyDuration:string;
  serviceTypeId: string;
  service_Type: string;
  taxeId: string;
  taxe_name: string;
  createdAt: string;
  purchaseDate: Date;
  installationDate: Date;
  constPrice: number;
  currencyType:string;
  companyId: string;
  supplierName:string;
  assetSerialNumbers:AssetSeialNumbers[] = []
}

export class AssetSeialNumbers{
  id?:string
  assetNameId?:string;
  serialNumber:string;
  barcode:string
}

export class AssetManagmentInterval {
  count: number
  assets: AssetMenagment[]
}

export class Report {
  totalCount: number
  assetsRecordList: ReportOfAssets[] = []
}

export class ReportOfAssets {
  dayName: string
  count: number
}
