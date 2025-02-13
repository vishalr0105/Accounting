export class JobDefination {
  id: string;
  jobDefinationType: string;
  jobDefination: string;
  labourCost:number;
  logisticCost:number;
  assetstage:string;
  JobDurationDays:number;
  jobDurationHrs: number;
  texPercentage: number;
  jobDurationMin: number;
  numberOfTeamMember: number;
  skillsIds: string;
  partsRequire: string;
  partsIds: string;
  parts: string;
  checklists: [];
  price?: number;
  static value: any;
  checklist:any;
  removeAt: any;
  jobName: string;
  JobDescription:string;
  jobCode: any;
  serviceCost: number;
  servicecost: number;
  techniciansRequired: number;
  skillName: string;
  license: string;
  TaskListdata: any;
  static jobDefinationType: string;
  jobCategoryID:string
  subcategoryNameID:string
  jobDescription: any;
  unitPrice: any;
  serviceDiscount: number;
  techniciansrequired: any;
}

export class CheckList {
  id: string;
  name: string;
  documentName: string;
  document: string;
  fileType: string;
}

export class JobDefinationList{
  JobDefinationId: string;
}
