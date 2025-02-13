import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { AuthService } from 'src/app/views/services/auth.service';
// import { SubscriptionPlanService } from 'src/app/views/services/subscription-plan.service';
import { TeamMemberService } from 'src/app/views/services/team-member.service';
import Swal from 'sweetalert2';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { backgroundColorProperty } from '@syncfusion/ej2/documenteditor';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/views/services/alert.service';

@Component({
  selector: 'app-blank',
  templateUrl: './allsubscribe.component.html',
  styleUrls: ['./allsubscribe.component.scss'],
})
export class AllSubscription implements OnInit {
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('maximize_users', { static: true }) maximizeUsersModal: any;
  planList: any[] = [];
  subscriptionList: any;
  MonthlyorYearly = 'USD-Monthly';
  isMonthlyBilling: boolean = true;
  filteredPlans: any[] = [];
  showCurrentPlanButton: boolean = false;
  currentuser: any;
  selectedQuantity: number = 2;
  itemId: any;
  itemId1: any;
  status: any;
  ItemId: any;
  userCurrentPlan: any;
  dataId: any;
  quantity: any;
  growPlanList: any;
  growPlanCount: any;
  formattedDate: string;
  public data: object[] | undefined;
  title = 'app';
  subscriptionData: any;
  currentPlan: any;
  currentIndex: number = -1;
  subtitle: string[] = [];
  numTechnicians: string;
  email: string;
  contact: string;
  accessKey:any;
  accessToken:string;
  modalRef: NgbModalRef | undefined;
  filterlist:any=[];
  curUser:any;
  maximizePlanId: string;
  constructor(private modalService: NgbModal, private _teamMemberService: TeamMemberService, private authService: AuthService,
    // private subscriptionPlan: SubscriptionPlanService,
    private alert: AlertService) {
    this.data = [
      { NoHeaderData: '', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'No of Users', Starter: '1 User', Grow: '1 - 5 Users', Maximize: 'Enterprises' },
      { NoHeaderData: 'Front Office Capabilities', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Manage Appointments', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Manage Customers', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Manage Company', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Manage Customer Contacts', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Diagnostic Questions', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Multi Level Job Categorizations', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Estimation & Quotes', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Expense Management', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Field Territory Management', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Self Service Appointment Booking', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Manage Company License & Certifications', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Manage Technician License & Certifications', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Manage Employees', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Insurance Management', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Leave Management', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Contract Creation & Tracking', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Payroll Management', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'GIS Based Field Territory management', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Triage Management', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Service Level Management Creation', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Customer Asset Management', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Preventitive Maintenance Management', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Predictive Maintenance', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Field Operation Capabilities', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Drag & Drop Scheduling', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Manual Scheduling', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Paperless Invoicing', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Email, SMS Notifications', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Track & Report Cost of Jobs/ Workorders', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'WO tracking', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Map Based Dispatcher Board', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Mobile payment processing & tracking', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Save Key performance reports', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Mobile App for iOS & Android', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Payment Collection', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Esignature', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Semi Automatic Scheduling', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'In- App employee Chat', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Checklist Creation', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Price Book Management', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Employee Time Tracking', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Kanban View of WO Status', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Technician performance', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'In App Parts Request', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Remote Assistance - Video & Audio Assistance', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Customer Reviews', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Augmented Reality Remote Assistance', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Automatic Scheduling', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Back Office Capabilities', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Warehouse Management', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Parts Management', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Order Fulfilment management', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Transfer Order', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Vendor Management', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Purchase order issuance', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Dashboard & Reporing', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Service Performance Dashboard', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Technician Dashboard', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Dispatcher Dashboard', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Business Performance Dashboard', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Financial Performance Dashboard', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Planning & Forceasting Dashboard', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Integrations', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Quickbooks Online', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Xero', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'AI Capabilities', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Knowldege AI', Starter: 'remove', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'AI for Lead Gen', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'AI Effortless Scheduling', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Augmented Reality Remote Assistance', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Voice AI', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Predictive Maintenance AI', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Professional Services', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Live Chat Support', Starter: 'tick', Grow: 'tick', Maximize: 'tick' },
      { NoHeaderData: 'Implementation Services', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Priority Support', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Relationship manager', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Fleet Management', Starter: '', Grow: '', Maximize: '' },
      { NoHeaderData: 'Vehicle Profile', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Vehicle Specifications', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Vehicle Financials', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Vehicle Service History', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Renewal Reminders', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Meter History', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Expense History', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
      { NoHeaderData: 'Live Location tracking', Starter: 'remove', Grow: 'remove', Maximize: 'tick' },
    ];

  }

  ngOnInit(): void {
    this.curUser=JSON.parse(sessionStorage.getItem('current_user'));
    this.subtitle = ['Front Office Capabilities', 'Field Operation Capabilities', 'Back Office Capabilities', 'Dashboard & Reporing', 'Integrations', 'AI Capabilities', 'Professional Services', 'Fleet Management']
    this.GetPlanWithPrice();
    this._teamMemberService.getTeamMembersById(this.authService.currentUser.id).subscribe((res) => {
      this.currentuser = res.user.emailID;
    });
   this.loadPlanData();
  }

  loadPlanData() {
    this.GetPlanByUserId();
    this.getcontactusdetails();
  }

  isMatched(value: string): boolean {
    return this.subtitle.includes(value);
  }
  rowDataBound(args: any): void {
    if (this.isMatched(args.data.NoHeaderData)) {
      const cell = args.row.querySelector('[aria-colindex="1"]');
      if (cell) {
        cell.style.backgroundColor = '#074CE7';
      }
    }
  }

  openVerticalCenteredModal(content: any): void {
    if(this.curUser.userType=='Admin'){
    this.modalService.open(content, { centered: true });
  }else{
    this.alert.showToaster('Only Admin Can Access','info');}
  }

  GetPlanByUserId() {
    // this.subscriptionPlan.GetSubscriptionsByUser(this.authService.currentUser.email).subscribe({
    //   next: (res: any[]) => {
    //     this.subscriptionData = res[1];
    //     console.log(this.subscriptionData, 'GetSubscriptionsByUser');
    //     if (this.subscriptionData) {
    //       this.itemId1 = this.subscriptionData.item_price_id;
    //       console.log(this.itemId1, 'itemIDD');
    //       this.status = this.subscriptionData.status;
    //       this.currentPlan = this.subscriptionData.item_price_id;
    //     }
    //   },
    //   error: (error) => {
    //     // Handle error
    //   }
    // });
  }

  isCurrentPlan(itemId: string): boolean {
    return this.itemId1 === itemId || this.maximizePlanId === itemId;
  }

  GetPlanWithPrice() {
    // this.subscriptionPlan.GetPlanWithPrice().subscribe(
    //   (res: any) => {
    //     console.log(res, 'GetPlanWithPrice')
    //     this.planList = res['list'].filter((x: any) => x.item.status === 'active' || x.item.status === 'in_trial');
    //     this.currentIndex = this.planList.findIndex(plan => {
    //       let index = this.itemId1 === (plan.item.id + '-' + this.MonthlyorYearly) && (plan.item.status=== 'active' || plan.item.status === 'in_trial');
    //       return index
    //     });
    //     this.planList.forEach((plan: any, index) => {
    //       this.ItemId = plan.item.id;
    //     });
    //   },
    //   (error: any) => {
    //     console.error('Error fetching plans:', error);
    //   }
    // );
  }

  filterPlans() {
    this.filteredPlans = this.planList.filter((plan: any) => {
      return this.isMonthlyBilling ? plan.item_price.period_unit === 'month' : plan.item_price.period_unit === 'year';
    });
  }

  toggleBilling() {
    this.isMonthlyBilling = !this.isMonthlyBilling;
    this.MonthlyorYearly = this.isMonthlyBilling ? 'USD-Monthly' : 'USD-Yearly';
  }

  handleButtonClick(item: any) {
   if(this.curUser.userType=='Admin'){
    if (
      (item.external_name === 'Maximize' &&
        this.accessToken === '' &&
        (this.itemId1 !== 'Standard-Pro-Plan-USD-Monthly' &&
          this.itemId1 !== 'Basic-Plan-USD-Monthly')) ||
      (item.external_name === 'Maximize' && this.accessToken !== '' && (this.itemId1 !== 'Standard-Pro-Plan-USD-Monthly' &&
        this.itemId1 !== 'Basic-Plan-USD-Monthly')))
     {
      this.openMaximizeUsersModal();
    } else {
      this.getChargebeeCheckoutUrl(item);
    }
  }else{
    this.alert.showToaster('Only Admin Can Access','info');
  }
  }

  openMaximizeUsersModal() {
    if(this.curUser.userType=='Admin'){
    this.modalRef = this.modalService.open(this.maximizeUsersModal, { centered: true });
    }else{
      this.alert.showToaster('Only Admin Can Access','info');
    }
  }

  getChargebeeCheckoutUrl(data: any) {

    console.log(data, "data");
    this.dataId = data.id;

    if (this.itemId1 == "Basic-Plan-USD-Monthly" || this.itemId1 == "Basic-Plan-USD-Yearly") {
      if (data.external_name == "Starter" || data.external_name == "Grow" || data.external_name == "Maximize") {
        Swal.fire('You are already subscribed to the Starter plan.');
      }
    }
    else if (this.itemId1 == "Standard-Pro-Plan-USD-Monthly" || this.itemId1 == "Standard-Pro-Plan-USD-Yearly") {
      if (data.external_name == "Grow" || data.external_name == "Starter" || data.external_name == "Maximize") {
        Swal.fire('You have already subscribed Grow plans for more user contact us.');
      }
    }
    else if (this.itemId1 == "Enterprise-Plan-USD-Monthly" || this.itemId1 == "Enterprise-Plan-USD-Yearly") {
      if (data.external_name == "Maximize" || data.external_name == "Starter" || data.external_name == "Grow") {
        Swal.fire('You have already subscribed Maximize plan.');
      }
    }

    else {
      const userEmail = this.currentuser;
      this.redirectToChargebee(data, userEmail);
    }
  }

  redirectToChargebee(data: any, userEmail: string) {
    let selectedPlan = data.external_name;
    const chargebeeBaseUrl = 'https://etapriseai.chargebee.com/hosted_pages/checkout';
    const subscriptionItemId = this.dataId + '-' + this.MonthlyorYearly;
    const quantity = selectedPlan === "Starter" ? 1 : 5;
    const utmSource = 'cb-app-copy';
    const chargebeeUrl = `${chargebeeBaseUrl}?subscription_items[item_price_id][0]=${subscriptionItemId}&subscription_items[quantity][0]=${quantity}&utm_source=${utmSource}&user_email=${encodeURIComponent(userEmail)}`;
    window.location.href = chargebeeUrl;
  }

  submitForm() {
    console.log('Form submitted with:', this.numTechnicians, this.email, this.contact);
    const model={
      numTechnicians:this.numTechnicians,
      contact:this.contact,
      email:this.email,
    };
    // this.subscriptionPlan.SaveContactUsDetails(model).subscribe({
    //   next: (res: any[]) => {
    //     console.log(res, 'SaveContactUsDetails');
    //   },
    //   error: (error) => {
    //     // Handle error
    //   }
    // });
    // this.subscriptionPlan.SendContactUsDetails(model).subscribe({
    //   next: (res: any[]) => {
    //     console.log(this.subscriptionData, 'GetSubscriptionsByUser');
    //     this.alert.showToaster(
    //       'Eamil Sent Successfully.',
    //       'success'
    //     );
    //     this.numTechnicians = '';
    //     this.contact = '';
    //     this.email = '';

    //     this.modalService.dismissAll();
    //   },
      // error: (error) => {
      //   // Handle error
      // }
    // });
  }

  getcontactusdetails() {
    // this.subscriptionPlan.GetContactUsDetails().subscribe((data: any[]) => {
    //  // console.log(data, 'getcontactusdetails');
    //   this.filterlist = data.filter((x: any) => x.userId === this.authService.currentUser.id);
    //   console.log(this.filterlist, 'filterlist');
    //   if (this.filterlist.length > 0) {
    //     this.accessToken = this.filterlist[0].accessToken;
    //     this.maximizePlanId = 'Enterprise-Plan-USD-Monthly';  // Assume you have a planId for maximize plan
    //     console.log( this.maximizePlanId, 'maximizePlanId');
    //   }
    // });
  }

  validateAccessKey()
  {
    if(this.accessKey===this.accessToken)
    {
      Swal.fire('Right Access Key');
      this.modalService.dismissAll();
    }
    else
    {
      Swal.fire('Wrong Access Key');
    }
  }
}

