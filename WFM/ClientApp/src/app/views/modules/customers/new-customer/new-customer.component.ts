import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomersService } from '../service/customers.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

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
    private router: Router,
    private location: Location,

  ) {
    this.customerForm = this.fb.group({
      nameAndContact: this.fb.group({
        title: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        firstName: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        middleName: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        lastName: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        suffix: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        companyName: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ],],
        customerDisplayName: ['', [Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        email: ['', [Validators.email,Validators.required]],
        phoneNumber: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        cc: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        bcc: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        mobileNumber: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        fax: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        other: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        website: ['',[Validators.required ]],
        nameOnCheck: ['',[Validators.required,Validators.minLength(2),this.noNumbersValidator(), ]],
        isSubCustomer: [false],
        parentCustomer: [''],
        billParentCustomer: [false],
      }),
      address: this.fb.group({
        billingStreet1: ['',Validators.required],
        billingStreet2: ['',Validators.required],
        billingCity: ['',Validators.required],
        billingState: ['',Validators.required],
        billingZip: ['',Validators.required],
        billingCountry: ['MYS',Validators.required], // Default country to Malaysia
        sameAsBilling: [false],
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
        paymentMethod: ['',Validators.required],
        terms: ['Net 60',Validators.required],
        deliveryOptions: ['',Validators.required],
        invoiceLanguage: ['English',Validators.required],
        creditLimit: ['',[Validators.required,Validators.min(1)]],
      }),
      additionalInfo: this.fb.group({
        customerType: ['',Validators.required],
        isTaxExempt: [false],
        exemptionReason: [''],
        exemptionDetails: [''],
        taxRate: [''],
        openingBalance: ['',[Validators.required,Validators.min(1)]],
        asOfDate: [new Date().toISOString().split('T')[0],Validators.required], // Default to today’s date
      }),
    });
  }
  noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasNumbers = /\d/.test(value);  // Check if the value contains any numbers
      return hasNumbers ? { 'noNumbers': { value: control.value } } : null;
    };
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
    // this.customerForm.get('additionalInfo').get('isTaxExempt').valueChanges.subscribe(checked=>{
    //   console.log(checked,'checked');
    //   if(checked){
    //     this.customerForm.get('additionalInfo').get('exemptionReason')?.setValidators([Validators.required])
    //     this.customerForm.get('additionalInfo').get('exemptionDetails')?.setValidators([Validators.required])
    //     this.customerForm.get('additionalInfo').get('taxRate')?.clearValidators()
    //   }else{
    //     this.customerForm.get('additionalInfo').get('exemptionReason')?.clearValidators()
    //     this.customerForm.get('additionalInfo').get('exemptionDetails')?.clearValidators()
    //     this.customerForm.get('additionalInfo').get('taxRate')?.setValidators([Validators.required])
    //   }
    // })
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
    console.log('Submitting Customer Form:', JSON.stringify(this.customerForm.value));
    console.log(this.customerForm.invalid,'invalidn');
    console.log(this.customerForm.valid,'valid');
    // if (this.customerForm.invalid) {
    //   // If form is invalid, loop through the controls and log the invalid ones
    //   Object.keys(this.customerForm.controls).forEach((controlName) => {
    //     const control = this.customerForm.get(controlName);
    //     if (control?.invalid) {
    //       console.log(`${controlName} is invalid`);
    //     }
    //   });
    // }
    const isUpdating = !!this.customerId;
    const serviceCall = isUpdating
      ? this.customersService.updateCustomerById(this.customerForm.value, this.customerId)
      : this.customersService.createCustomer(this.customerForm.value);

    serviceCall.subscribe({
      next: (res) => {
        console.log('Server Response:', res);

        Swal.fire({
          title: isUpdating ? 'Customer Updated!' : 'Customer Created!',
          text: `The customer has been ${isUpdating ? 'updated' : 'added'} successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigateByUrl(`/admin/customer`);
        });
      },
      error: (error) => {
        console.error('Operation failed:', error);

        Swal.fire({
          title: 'Error!',
          text: 'There was an issue processing your request. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });

    // Reset form after 10 seconds
    setTimeout(() => this.resetCustomerForm(), 10000);
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
        creditLimit: '0',
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

  goBack() {
    // this.router.navigate(['../']); // Navigate to the previous route
    this.location.back();
  }
}
