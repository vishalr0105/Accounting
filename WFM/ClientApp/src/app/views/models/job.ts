import { AdditionalForms } from './additinalforms';
import { Attributes } from './attributes';
import { JobAttachments } from './jobAttachments';
import { Product } from './product';

export class Job {
  id: string;
  jobNumber: number;
  jobCategoryId: string[];
  jobCategory: string[];
  jobName: string;
  jobDueDate: string;
  clientPurchaseOrderNumber: string;
  clientAndSuppliersId: string = "";
  clentAndSupplierName: string;
  assaignTo: string;
  address: string;
  location: string;
  jobNotes: string;
  userId: string;
  teamId: string;
  teamName: string;
  contractId: string;
  formGroupId: string;
  formId: string;
  isAddAditionalForm: boolean;
  formListId: AdditionalForms[];
  documents: string[];
  assetManagment: string[] = [];
  products: Product[];
  completed: string;
  createdAt: string;
  createdBy: string;
  jobStartDate?: string;
  jobStartTime?: string;
  jobStartIsoDate?: string;
  jobEndDate?: string;
  jobEndTime?: string;
  jobEndIsoDate?: string;
  jobDue: boolean;
  branch: string;
  workOrderStatusId?: string;
  workOrderStatusName: string;
  workOrderStatusColor: string;
  jobDefinitionId: string;
  customerContactName: string;
  customerContactEmail: string;
  customerContactPhoneNo: string;
  customerContactAltPhoneNo: string;
  customerContactAddress: string;
  jobAttachments: JobAttachments[];
  updatedBy: string;
  customerPreferredDate: any;
  attributeTable: Attributes[] = [];
  subCategoryId: string;
  owner: string;
  requestTypeId: string;
  customerSatisfaction: string;
  durationOfJob: string;
  reference: string;
  priority: string = "";
  openDate?: Date = null;
  contractualETA: string;
  etaDate?: Date = null;
  callBackDate?: Date = null;
  impact: string;
  urgency: string;
  affectedUsers: string;
  problemCode: string;
  isAutoAssign: boolean = false;
  technicianComments: string;
  jobCheckListIds: string[] = [];
  customerFeedback: string;
  customerSignature: string;
  services: QuoteServiceItem[] = []
}

export class QuoteServiceItem {
       
  id?: string;
  serviceId: string = "";
  name: string;
  unitPrice: number;
  description: string;
  total: number = 0;
  jobId?: string;

  constructor(serviceId?: string,
          name?: string,
          unitPrice?: number,
          description?: string,
          total?: number) {
          this.serviceId = serviceId || "";
          this.name = name;
          this.unitPrice = unitPrice;
          this.description = description;
          this.total = total;
  }
}

export class JobMultiSelect {
  id: string;
  jobNumber: string;
}

export class JobReturn {
  jobId: string;
  teamMemberId: string;
  alreadyAssigned: boolean;
}

export class JobAndAssets {
  jobId: string;
  assetsId: string[];
}

export class JobTechnicianCommentsAndCheckList {
  jobId: string;
  technicianComments: string;
  checkListIds: string[];
  jobAttachments: JobAttachments[];
  customerFeedback: string;
  customerSignature: string;
}

export class UpdateJobStatus {
  jobId: string;
  WorkOrderStausId?: string;
}
