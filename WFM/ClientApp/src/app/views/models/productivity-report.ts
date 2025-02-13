export class ProductivityReport {
  id: string;
  jobNumber: string;
  clientAndSuppliers: string;
  workOrderStatusName: string;
  jobDueDate: Date;
  jobStartDate: Date;
  jobEndDate: Date;
  teamId: string;
  teamName: string;
  jobDuration: number;
  teamMemmbers: TeamMemmbers[];
}
export class reportsearch {
  fromDate: Date;
  toDate: Date;
  clientId: string;
  memberId: string;  
}

export class slareportsearch {
  fromDate: Date;
  toDate: Date;
  slaId: string;
}

export class TeamMemmbers { 
  fullName: string;  
}
