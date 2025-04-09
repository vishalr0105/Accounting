import { Component, OnInit } from '@angular/core';
import { stackedData ,variespiedata} from './datasource';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  // public primaryXAxis?: Object;
  // public chartData?: Object[];
  public title?: string;
  // primaryYAxis: any;

  // pie chart
  public pieData?: Object[];
  public startAngle?: number;
  public endAngle?: number;
  public center?: Object ;
  public explode?: boolean ;
  public enableAnimation?: boolean ;
  // public title?: string ;
  public radius?: string ;
  public legendSettings?: Object;

  ngOnInit(): void {
      this.chartData = stackedData;
      this.primaryXAxis = {
          valueType: 'Category',
          title: 'Months'
      };
      this.title = 'Sales Comparison';

      this.pieData = variespiedata;
        this.legendSettings = {
            visible: false
        };
    this.startAngle = 0;
    this.endAngle = 360;
    this.enableAnimation = true;
    this.title = 'Mobile Browser Statistics';
  }

  progress = 33; // Progress percentage
  steps = [
    { label: "Set up ways for the customer to pay you", completed: true },
    { label: "Order Card Reader", completed: false, action: "Start" },
    { label: "Send an invoice and let your customers pay you online", completed: false, action: "Start" }
  ];
  actions = [
    { label: "Customer", icon: "fa-user" ,routerLink:'/admin/customer/customer-list'},
    { label: "Product or service", icon: "fa-box" ,routerLink:'/admin/products'},
    { label: "Estimate", icon: "fa-file-invoice-dollar" ,routerLink:'/admin/sales/estimates'},
    { label: "Invoice", icon: "fa-file-alt" ,routerLink:'/admin/sales/invoices'},
    { label: "Recurring invoice", icon: "fa-sync-alt",routerLink:'' },
    { label: "Receive payment", icon: "fa-hand-holding-usd" ,routerLink:''},
    { label: "Sales receipt", icon: "fa-receipt" ,routerLink:''},
    { label: "Bank deposit", icon: "fa-university",routerLink:'' },
    { label: "Payment links", icon: "fa-link" ,routerLink:'/admin/sales/paymentlinks'},
    { label: "Take payment", icon: "fa-credit-card" ,routerLink:''},
    { label: "Create statement", icon: "fa-file-contract" ,routerLink:''},
    { label: "Create recurring payment", icon: "fa-redo" ,routerLink:'/recurringpayment/new'}
  ];

  // invoices
  totalAmount = 11.04;
  overdueCount = 1;
  invoices = [
    {
      company: 'Famous Transport',
      invoiceNumber: '1014',
      amount: 11.04,
      dueDate: '01/25/2025'
    }
  ];

  // tasking
  tasks = [
    {
      title: 'Remind your customer about 1 unpaid invoice',
      subtitle: "You're waiting for $11.04.",
      action: 'Go'
    },
    {
      title: 'Match or categorize 5 sales transactions',
      subtitle: '',
      action: 'Go'
    }
  ];

  // chart
  income = 0.00;
  difference = 0.00;
  selectedDuration = 'This month';
  comparePreviousYear = false;
  durations = ['This month', 'Last month', 'Last 3 months', 'This year'];

  public chartData: Object[] = [
    { week: 'Week 1', income: 0 },
    { week: 'Week 2', income: 0 },
    { week: 'Week 3', income: 0 },
    { week: 'Week 4', income: 0 }
  ];

  public primaryXAxis: Object = { valueType: 'Category' };
  public primaryYAxis: Object = { labelFormat: '${value}' };

  toggleComparison() {
    this.comparePreviousYear = !this.comparePreviousYear;
  }
}
