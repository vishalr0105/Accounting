import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../service/customers.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
})
export class NewCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      nameAndContact: this.fb.group({
        title: [''],
        firstName: [''],
        middleName: [''],
        lastName: [''],
        suffix: [''],
        companyName: [''],
        customerDisplayName: ['', Validators.required],
        email: ['', [Validators.email]],
        phoneNumber: [''],
        cc: [''],
        bcc: [''],
        mobileNumber: [''],
        fax: [''],
        other: [''],
        website: [''],
        nameOnCheck: [''],
        isSubCustomer: [false],
        parentCustomer: [''],
        billParentCustomer: [false],
      }),
      address: this.fb.group({
        billingStreet1: [''],
        billingStreet2: [''],
        billingCity: [''],
        billingState: [''],
        billingZip: [''],
        billingCountry: ['MYS'], // Default country to Malaysia
        sameAsBilling: [true],
        shippingStreet1: [''],
        shippingStreet2: [''],
        shippingCity: [''],
        shippingState: [''],
        shippingZip: [''],
        shippingCountry: ['MYS'],
      }),
      notesAttachments: this.fb.group({
        notes: [''],
        attachment: [null],
      }),
      payments: this.fb.group({
        paymentMethod: [''],
        terms: ['Net 60'],
        deliveryOptions: [''],
        invoiceLanguage: ['English'],
        creditLimit: [''],
      }),
      additionalInfo: this.fb.group({
        customerType: [''],
        isTaxExempt: [false],
        exemptionReason: [''],
        exemptionDetails: [''],
        taxRate: [''],
        openingBalance: ['0.00'],
        asOfDate: [new Date().toISOString().split('T')[0]], // Default to today’s date
      }),
    });
  }
  get nameAndContactForm(): FormGroup {
    return this.customerForm.get('nameAndContact') as FormGroup;
  }
  get addressForm(): FormGroup {
    return this.customerForm.get('address') as FormGroup;
  }
  get notesAttachmentsForm(): FormGroup {
    return this.customerForm.get('notesAttachments') as FormGroup;
  }
  get paymentsForm(): FormGroup {
    return this.customerForm.get('payments') as FormGroup;
  }
  get additionalInfoForm(): FormGroup {
    return this.customerForm.get('additionalInfo') as FormGroup;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id'); // Extract the ID from the URL

      if (this.customerId) {
        this.getCustomerDetails(this.customerId); // Fetch customer data if ID is present
      }
    });
  }

  getCustomerDetails(id: string) {
    this.customersService.getCustomerById(id).subscribe(
      (res) => {
        // Pre-fill the form with the existing customer data
        if (res) {
          this.customerForm.patchValue({
            nameAndContact: {
              ...res.nameAndContact,
            },
            address: {
              ...res.address,
            },
            notesAttachments: {
              notes: res.notesAttachments.notes,
              attachment: res.notesAttachments.attachment,
            },
            payments: {
              ...res.payments,
            },
            additionalInfo: {
              ...res.additionalInfo,
            },
          });
        }
      },
      (err) => {
        console.error('Error fetching customer details:', err);
      }
    );
  }

  onSubmit() {
    console.log('Final Customer Form Data:', this.customerForm.value);
    console.log(
      'Final Customer Form Data:',
      JSON.stringify(this.customerForm.value)
    );
    if (this.customerId) {
      this.customersService
        .updateCustomerById(this.customerForm.value, this.customerId)
        .subscribe(
          (res) => {
            console.log(res, 'res');

            // Show SweetAlert after update
            Swal.fire({
              title: 'Customer Updated Successfully!',
              text: 'Your customer details have been updated. We will process it and get back to you if needed.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              // Redirect to customer list after clicking OK
              this.router.navigateByUrl(`/admin/customer`);
            });
          },
          (error) => {
            console.error('Update failed', error);
            // Optionally, show an error alert
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue updating the customer. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
    } else {
      this.customersService.createCustomer(this.customerForm.value).subscribe({
        next: (res) => {
          console.log(res, 'res');
          // Show SweetAlert after successful creation
          Swal.fire({
            title: 'Customer Created Successfully!',
            text: 'Your customer has been added successfully. We will process it and get back to you if needed.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Redirect to customer list after clicking OK
            this.router.navigateByUrl(`/admin/customer`);
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    // console.log('Final Customer Form Data:', this.customerData);

    setTimeout(() => {
      this.resetCustomerForm();
    }, 10000);
  }
  resetCustomerForm() {
    this.customerForm.reset({
      nameAndContact: {
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        companyName: '',
        customerDisplayName: '',
        email: '',
        phoneNumber: '',
        cc: '',
        bcc: '',
        mobileNumber: '',
        fax: '',
        other: '',
        website: '',
        nameOnCheck: '',
        isSubCustomer: false,
        parentCustomer: '',
        billParentCustomer: false,
      },
      address: {
        billingStreet1: '',
        billingStreet2: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        billingCountry: 'MYS', // Default country to Malaysia
        sameAsBilling: true,
        shippingStreet1: '',
        shippingStreet2: '',
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        shippingCountry: 'MYS',
      },
      notesAttachments: {
        notes: '',
        attachment: null,
      },
      payments: {
        paymentMethod: '',
        terms: 'Net 60', // Default value
        deliveryOptions: '',
        invoiceLanguage: 'English', // Default value
        creditLimit: '',
      },
      additionalInfo: {
        customerType: '',
        isTaxExempt: false,
        exemptionReason: '',
        exemptionDetails: '',
        taxRate: '',
        openingBalance: '0.00', // Default value
        asOfDate: new Date().toISOString().split('T')[0], // Default to today’s date
      },
    });
  }
}
