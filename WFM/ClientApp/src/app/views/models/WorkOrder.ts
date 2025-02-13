import { Guid } from '@syncfusion/ej2/pdf-export';
import { Quote } from './quote';

export class WorkOrderManagement {
  id: string;
  woNumber: string;
  woRating:number;
  customerReview;
  clientAddress: string;
  clientLong:string;
  clientLat:string
  clientAccountId: string;
  clientAccountName: string;
  quoteId: string;
  quote: Quote;
  travelStartTime:Date
  clientContactId: string;
  scheduleSlot: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  companyId: string;
  appointMentTime: string;
  contractId: Guid;
  appointmentId: string;
  appointmentProjectId?: string;
  JobId?:string;
  IsProject?:boolean;
  triageId: string;
  partId: string;
  technicianSelectionId: string;
  technicianName: string;
  woStatus: string;
  woStatusId: string;
  scheduleDate: string;
  contactName: string;
  clientZipCode:string;
  conatactEmail: string;
  contactNumber: string;
  appointmentStatusName: string;
  companyName: string;
  createdAt: Date;
  skillsRequired:string[] = [];
  accountServiceLocation: string;
  invoiceId:string;
  woStartTime:string;
  woEndTime:string;
  notes:string
  quotes: WorkOrderQuotes[] = [];
  parts: WorkOrderParts[] = [];
  services: WorkOrderServices[] = [];
  checkLists: Array<any> = [];
  checklist:string;
  assets: WorkOrderAssets[] = [];
  contracts: WorkOrderContracts[] = [];
  technicianAndWokrkOrderLink: TechnicianWoLink[] = [];
  Client: any;
  Technician_Assigned: any;
  WO: any;
  WOId: any;
  signature:any;
  jobStartedTime:Date;
  jobCompletedTime:Date;
  totalTravelTime:string;
  totalJobCompletedTime:string;
  currentDate:Date;
}

export interface TechnicianWoLink {
  id?: string;
  workOrderId?: string;
  scheduleDate?: Date;
  scheduleSlot?: string;
  technicianId: string;
  startTime: any;
  endTime: any;
  StartTimeFormat?: any,
  EndTimeFormat? : any
  locationLat?:number
  locationLong?:number
  workOrderNu?: number;
  woStatus?:string;
}

export interface WorkOrderAssets {
  id?: string;
  assetId: string;
  assetName: string;
  modelNumber?: string;
  asset_Type?: string;

  status?: string;
}

export interface WorkOrderContracts {
  id?: string;
  contractId: Guid;
}

export interface WorkOrderServices {
  id?: string;
  serviceId: string;
  unitPrice: number;
  quantity: number;
  total: number;
  name: string;
  jobHrs: number;
  jobMin: number;
}

export interface WorkOrderCheckList {
  id?: string;
  value: string;
  taskCompleted?:boolean ;
  name: string;
  status: string;
  type?:string;
  checkListId: string;
  jobId: string;
  workOrderId?: string;
}

export interface WorkOrderQuotes {
  id?: string;
  quoteId: string;
  quoteNumber?: string;
  status?: string;
  contact_Name?: string;
  account_Name?: string;
  totalQuoteValue?: number;
  workOrderId?: string;
}

export interface WorkOrderParts {
  id?: string;
  partId: string;
  name?:string;
  description?:string;
  quantity: number;
  available_Quantity: number;
  workOrderId?: string;
  total: number;
  unitPrice: number;
}

export interface WorkOrderTechData {
  id?: string;
  woNumber: number;
  clientName?:string;
  technicianAssigned?:string;
  date: Date;
  startTime: string;
  createdOn: Date;
  woStatus: string;
}

export class WorkOrderAssginedTechnicains {

 id?: string;
 CompanyId :string;
 WorkId:string;
 CategoryId :string;
 SubCategoryId :string;
 ScheduleDate :string;
 ScheduleSlot :string;
 TechnicianSelectionId:string;
 WOStatus :string;
}
