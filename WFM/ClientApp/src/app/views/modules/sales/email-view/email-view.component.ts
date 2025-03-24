import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  invoice = {
    title: "Your invoice is ready!",
    total: "$0.00",
    message: "The email message you write will go here",
    company: "Advintek Consulting Services Sdn. Bhd.",
    address: "100 W Victoria St, Long Beach, CA 90805-2147",
    email: "info@advintek.com.my",
    securityEmail: "security@intuit.com"
  };

  viewDetails() {
    alert("Redirecting to invoice details...");
  }
  showSideBarRight:boolean=false
  sideBarRight(){
    this.showSideBarRight=!this.showSideBarRight
  }
}
