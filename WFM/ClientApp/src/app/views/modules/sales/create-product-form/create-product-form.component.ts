import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditSettingsModel, GridComponent, RowDropSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { EmailViewComponent } from '../email-view/email-view.component';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductFormComponent implements OnInit {
  @ViewChild('grid', { static: false }) public grid: GridComponent;
  @ViewChild(EditPageComponent) editPageComponent!: EditPageComponent;
  @ViewChild(EmailViewComponent) emailPageComponent!: EmailViewComponent;

  pageType: string = '';
  activeTab: string = 'edit'; // Default Active Tab
  invoiceData:any={}
  public sum: number = 0;

  constructor(private router: Router,private location: Location,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pageType = data['pageType']; // Get the pageType from route data
      console.log('Page Type:', this.pageType);
    });
  }

  manage(){
   if( this.activeTab=='edit') this.editPageComponent.sideBarRight()
   if( this.activeTab=='email') this.emailPageComponent.sideBarRight()
  }

  reviewAndSend() {
    console.log('Reviewing and Sending Invoice...');
  }

  goBack() {
    // this.router.navigate(['../']); // Navigate to the previous route
    this.location.back();
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // get edit component form data======================

  getInvoiceData(data: any) {
    this.invoiceData = data; // Store or process as needed
  }
  submitInvoice() {
    console.log("Final Submitted Invoice Data:", this.invoiceData);
    // Send to API or further processing
  }
}
