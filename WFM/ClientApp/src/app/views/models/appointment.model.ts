import { Contacts } from './Customer.model';
import { Company } from './company';

export class Appointment {
  id: string;
  accountNameString: string;
  appointmentPriority:number;
  appointmentNumber: number;
  accountNameId: string;
  categoryId: string;
  subCategoryId: string;
  descriptionIssue: string;
  createdAt: Date;
  contact: Contacts;
  contactID: string;
  scheduleDate: string;
  scheduleSlot: string;
  contactName: string;
  conatactEmail: string;
  contactNumber: string;
  appointmentStatus: string;
  prev_AppointmentStatus:string;
  companyId: string;
  companyName: string;
  companyAddress:string;
  company: Company;
  categoryName: string;
  subCategoryName: string;
  accountServiceLocation: string;
  updatedAt: Date;
  appointmentTime: string;
  attachments:any;
  workorderId:any;
  appointmentdoc:Array<any>;
  aptProgress:any;
  projectStartDate:string;
  projectEndDate:string;
  assetId:string;

  // appointmentDocuments: AppointmentDocument[] = [];
}

export interface AppointmentStatus {
  appointmentStatus: string;
  id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export class AppointmentDocument {
  appointmentId?: string;
  documentItem: string = null;
  fileType: string;
  visible: boolean;
  isChecked: boolean;
}

export class RecreateAppt{
  workorderId:string;
  apptSlot:string;
  apptTime:string;
}
