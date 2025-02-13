export class WorkOrderReport {
    id: string;
    jobNumber: string;
    clientAndSuppliers: string;
    workOrderStatusName: string;
    jobDueDate: Date;
    jobStartDate: Date;
    jobEndDate: Date;
    teamName: string;
    jobDuration: number;
  }
  export class worReportsearch {
    fromDate: Date;
    toDate: Date;
    clientId: string;
    memberId: string;
  }