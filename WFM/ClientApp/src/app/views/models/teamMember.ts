import { InsurenceDetails } from "./InsurenceDetails";
import { IndivisualLicense } from "./indivisualLicense";
import Skills from "./skills";
import { TeamDetails } from "./teamDetails";
import { DateTime } from "@syncfusion/ej2-angular-charts";

export class TeamMember {
  id: string
  userName: string
  email: string
  jobTitle: string
  phoneNumber: string
  configuration: string
  isEnabled: boolean
  status:boolean
  webDashboardAcccess?: boolean
  mobileAppAccess?: boolean
  inventoryProducts?: boolean
  createJobsOnMobile?: boolean
  createClient?: boolean
  viewClient?: boolean
  isLockedOut?: boolean
  createAndViewQuotes?: boolean
  unassociateMobileDevice?: boolean
  autoComplatePendingJob?: boolean
  passwordReset?: boolean
  currentPassword: string
  newPassword: string
  assignJobNotification: boolean
  rejectJobNotification: boolean
  unassignJobNotificaion: boolean
  pendingJobForm: boolean
  complateJobForm: boolean
  externalCalender: boolean
  assetServiceReminder: boolean
  complateJobEmail: boolean
  userImage: string;
  rollId: string;
  roles: string[] = [];
  teamDetails: TeamDetails
  createdAt?: string
  fullName: string
  employeeID: string
  designation: string
  typeofEmployment: string
  departmentID: string
  reportingManager: string
  joiningDate: string
  currentlyWorking : boolean = true;
  wageRateType: string
  wageValue: string;
  bonusCommissions: string
  overtimecharges: string
  dateofBirth: string
  dateofLeaving: string
  bloodGroup: string
  baseLocation: string
  emailID : string
  mobileNumber : string
  emergencyContactNumber: string
  emergencyContactName: string
  insuranceNumber: string
  socialSecurityNumber: string
  drivingLicenseNumber: string
  assignedIMEINumber: string
  baseAddress:string;
  countryId:string
  stateId:string
  cityId:string
  password:string
  parts:string
  zipcode:any
  longitudeOffice:any;
  latitudeOffice: any;
  newMsgsCount: number;
  socketId: string;
  lastMsg: string;
  lastMstTime: DateTime;
}

export class TeamUser {
  skills : Skills[];
  user :TeamMember;
  indivisualLicense :IndivisualLicense[];
  insurenceDetails : InsurenceDetails[];
  parts : any;
}
export class FieldTechnicianKit {
  id: string
  partId: string
  name: string
  quantity: any
}
