import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EditSettingsModel,
  GridComponent,
  RowDropSettingsModel,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { EmailViewComponent } from '../email-view/email-view.component';
import { EstimatesService } from '../salesServices/estimates.service';
import { InvoicesService } from '../salesServices/invoices.service';
import { AlertService } from 'src/app/views/services/alert.service';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss'],
})
export class CreateProductFormComponent implements OnInit {
  @ViewChild('grid', { static: false }) public grid: GridComponent;
  @ViewChild(EditPageComponent) editPageComponent!: EditPageComponent;
  @ViewChild(EmailViewComponent) emailPageComponent!: EmailViewComponent;

  pageType: string = '';
  activeTab: string = 'edit'; // Default Active Tab
  invoiceData: any = {};
  public sum: number = 0;
  orderId:any
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private estimatesService: EstimatesService,
    private invoicesService: InvoicesService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.pageType = data['pageType']; // Get the pageType from route data
      console.log('Page Type:', this.pageType);
    });
     this.orderId = this.route.snapshot.paramMap.get('id');
    // console.log(orderId, 'orderId');

  }

  manage() {
    if (this.activeTab == 'edit') this.editPageComponent.sideBarRight();
    if (this.activeTab == 'email') this.emailPageComponent.sideBarRight();
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
  isValid:any
  getInvoiceData(event: { data: any, isValid: boolean }) {
    this.invoiceData = event.data;  // Get the form data from the event
    this.isValid = event.isValid;

    console.log('this.invoiceData',this.invoiceData);
    console.log('this.isValid',this.isValid);


  }
  submitInvoice() {
    console.log(this.isValid,'this.isValid');

    console.log('Final Submitted Invoice Data:', this.invoiceData);
    const transformedData = {
      ...this.invoiceData,
      selectedCustomer: {
        id: this.invoiceData.selectedCustomer,
        name: this.invoiceData.name,
        email: this.invoiceData.email,
        phoneNumber: this.invoiceData.phoneNumber === 'N/A' ? null : this.invoiceData.phoneNumber,
        unbilledCharges: this.invoiceData.unbilledCharges == null ?0:this.invoiceData.unbilledCharges
      }
    };

    // Remove the redundant fields from the root level
    delete transformedData.name;
    delete transformedData.email;
    delete transformedData.phoneNumber;
    delete transformedData.unbilledCharges;
    console.log(transformedData,'transformedData');

    console.log(
      'Final Submitted Invoice Data:',
      JSON.stringify(this.invoiceData)
    );

    if (this.pageType == 'estimation') {
      if(this.orderId){
        this.estimatesService.updateEstimate(transformedData,this.orderId).subscribe({
          next: (res) => {
            console.log(res, 'estimate');
            this.alertService.showToaster(res.message, 'success');
            this.goBack();
          },
          error: (err) => {
            let errorMessage = 'An unknown error occurred.';

            if (err.error instanceof ErrorEvent) {
              // Client-side error or network error
              errorMessage = `Client-side error: ${err.error.message}`;
            } else {
              // Server-side error
              if (err.status === 400) {
                // Bad Request, typically when there is validation error in the request body
                errorMessage = `Bad Request: ${
                  err.error.message || 'Invalid data sent.'
                }`;
              } else if (err.status === 500) {
                // Internal Server Error
                errorMessage = `Server error occurred. Please try again later.`;
              } else {
                // Handle other HTTP statuses if needed
                errorMessage = `Server-side error: ${err.status} - ${err.message}`;
              }
            }

            // Log the error details to the console for debugging
            console.error('Error occurred:', err);

            // Show SweetAlert2 for user-friendly error message
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33', // Customize button color if needed
            });
          },
        });
      }else{
        this.estimatesService.addEstimate(transformedData).subscribe({
          next: (res) => {
            console.log(res, 'estimation');
            this.alertService.showToaster(res.message, 'success');
            this.goBack();
          },
          error: (err) => {
            let errorMessage = 'An unknown error occurred.';

            if (err.error instanceof ErrorEvent) {
              // Client-side error or network error
              errorMessage = `Client-side error: ${err.error.message}`;
            } else {
              // Server-side error
              if (err.status === 400) {
                // Bad Request, typically when there is validation error in the request body
                errorMessage = `Bad Request: ${
                  err.error.message || 'Invalid data sent.'
                }`;
              } else if (err.status === 500) {
                // Internal Server Error
                errorMessage = `Server error occurred. Please try again later.`;
              } else {
                // Handle other HTTP statuses if needed
                errorMessage = `Server-side error: ${err.status} - ${err.message}`;
              }
            }

            // Log the error details to the console for debugging
            console.error('Error occurred:', err);

            // Show SweetAlert2 for user-friendly error message
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33', // Customize button color if needed
            });
          },
        });
      }
    } else {
      if(this.orderId){
        this.invoicesService.updateInvoice(transformedData,this.orderId).subscribe({
          next: (res) => {
            console.log(res, 'invoice');
            this.alertService.showToaster(res.message, 'success');
            this.goBack();
          },
          error: (err) => {
            let errorMessage = 'An unknown error occurred.';

            if (err.error instanceof ErrorEvent) {
              // Client-side error or network error
              errorMessage = `Client-side error: ${err.error.message}`;
            } else {
              // Server-side error
              if (err.status === 400) {
                // Bad Request, typically when there is validation error in the request body
                errorMessage = `Bad Request: ${
                  err.error.message || 'Invalid data sent.'
                }`;
              } else if (err.status === 500) {
                // Internal Server Error
                errorMessage = `Server error occurred. Please try again later.`;
              } else {
                // Handle other HTTP statuses if needed
                errorMessage = `Server-side error: ${err.status} - ${err.message}`;
              }
            }

            // Log the error details to the console for debugging
            console.error('Error occurred:', err);

            // Show SweetAlert2 for user-friendly error message
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33', // Customize button color if needed
            });
          },
        });
      }else{
        this.invoicesService.addInvoice(transformedData).subscribe({
          next: (res) => {
            console.log(res, 'invoice');
            this.alertService.showToaster(res.message, 'success');
            this.goBack();
          },
          error: (err) => {
            let errorMessage = 'An unknown error occurred.';

            if (err.error instanceof ErrorEvent) {
              // Client-side error or network error
              errorMessage = `Client-side error: ${err.error.message}`;
            } else {
              // Server-side error
              if (err.status === 400) {
                // Bad Request, typically when there is validation error in the request body
                errorMessage = `Bad Request: ${
                  err.error.message || 'Invalid data sent.'
                }`;
              } else if (err.status === 500) {
                // Internal Server Error
                errorMessage = `Server error occurred. Please try again later.`;
              } else {
                // Handle other HTTP statuses if needed
                errorMessage = `Server-side error: ${err.status} - ${err.message}`;
              }
            }

            // Log the error details to the console for debugging
            console.error('Error occurred:', err);

            // Show SweetAlert2 for user-friendly error message
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33', // Customize button color if needed
            });
          },
        });
      }
    }
    // Send to API or further processing
  }
}
