import { InsurenceDetails } from "./InsurenceDetails"
import { IndivisualLicense } from "./indivisualLicense"
import Skills from "./skills"
import { TeamDetails } from "./teamDetails"

export class TeamMemberForTeamPage {
    id: string
    teammembersID: string
    userName: string
    email: string
    jobTitle: string
    phoneNumber: string
    configuration: string
    isEnabled: boolean
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
    image: string;
    roles: string[] = [];
    teamDetails: TeamDetails
    createdAt?: string
    companyId?: string
    status: string
  
    fullName: string
    employeeId: string
    designation: string
    employmentType: string
    department: string
    reportingManager: string
    joiningDate: Date
    isCurrentlyWorking : boolean
    wageRateType: string
    wageValue: string;
    bonus: string
    overTimeCharges: string
    dateOfBirth: Date
    bloodGroup: string
    baseLocation: string
    emailAddress : string
    mobileNumber : string
    emergencyContactNo: string
    insuranceNo: string
    socialSecurityNo: string
    drivingLicense: string
    assignedMobileIMEI: string
    userRole: string
    skills : Skills[];
    indivisualLicense :IndivisualLicense; 
    InsurenceDetails : InsurenceDetails;
  }
  