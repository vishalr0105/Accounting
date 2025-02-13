import { WarrantyClass } from "./warrantyClass";

export class WarrantyType {
  id: string;
  name: string;
  warrantyClassId: string;
  warrantyClass: WarrantyClass;
  description: string;
  coverageTimeId: string;
  coverageTime:CoverageTime;
  serviceLevelAgreementId: string;
  serviceLevelAgreement:ServiceLevelAgreement;
  companyId: string;
  userId: string;
}


export class CoverageTime {
  id: string;
  code: string;
  description: string;
}

export class ServiceLevelAgreement {
  id: string;
  name: string;
  resolutionTime: string;
  responseTime: string;
  partsReplacement: string;
  partsReplacementWarrenty: string;
}
