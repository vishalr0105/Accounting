import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../customers/service/customers.service';
import { ProductService } from '../../customers/service/product.service';
import { Location } from '@angular/common';
import { SalesOrderService } from '../salesServices/sales-order.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recurring-payment-new',
  templateUrl: './recurring-payment-new.component.html',
  styleUrls: ['./recurring-payment-new.component.scss']
})
export class RecurringPaymentNewComponent implements OnInit {
  salesOrderForm: FormGroup;
  customers: any[] = [];
  productOptions: any[] = [];
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private productService: ProductService,
    private location: Location,
    private salesOrderService:SalesOrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if(orderId){
      console.log(orderId,'orderId');

    }
    this.initForm();
    this.loadCustomers();
    this.loadProducts();
  }

  initForm(): void {
    this.salesOrderForm = this.fb.group({
      orderInfo: this.fb.group({
        orderDate: [new Date().toISOString().substring(0, 10), Validators.required],
        orderNumber: ['1001', Validators.required]
      }),
      customerInfo: this.fb.group({
        customer: [null, Validators.required],
        contactInfo: ['', [Validators.required, Validators.email]],
        billTo: ['', Validators.required],
        shipTo: ['', Validators.required],
        // isTaxExempt: [false]
      }),
      items: this.fb.array([this.createItem()]),
      notes: this.fb.group({
        customerNotes: ['Thank you for your business!'],
        internalNotes: ['']
      }),
      summary: this.fb.group({
        subtotal: [0],
        taxRate: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
        tax: [0],
        total: [0]
      })
    });

    this.watchCustomerChanges();
    this.watchFormChanges();
  }

  watchCustomerChanges(): void {
    this.customerControl.valueChanges.subscribe(customer => {
      if (customer) {
        this.updateCustomerFields(customer);
      }
    });
  }

  watchFormChanges(): void {
    this.salesOrderForm.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.customersService.getCustomers().subscribe(
      (customers: any[]) => {
        this.customers = customers;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading customers:', error);
        this.isLoading = false;
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(res => {
      this.productOptions = res;
    });
  }

  updateCustomerFields(customer: any): void {
    const customerInfo = this.customerInfo;

    // Update email
    customerInfo.get('contactInfo').setValue(customer.email);

    // Update billing address
    const billingAddress = this.formatAddress(
      customer.billingAddressFirstName,
      customer.billingAddressLastName,
      customer.billingAddressLine1,
      customer.billingAddressLine2,
      customer.billingAddressCity,
      customer.billingAddressState,
      customer.billingAddressCountry
    );
    customerInfo.get('billTo').setValue(billingAddress);

    // Update shipping address (fall back to billing if empty)
    const shippingAddress = customer.shippingAddressLine1
      ? this.formatAddress(
          customer.shippingAddressFirstName,
          customer.shippingAddressLastName,
          customer.shippingAddressLine1,
          customer.shippingAddressLine2,
          customer.shippingAddressCity,
          customer.shippingAddressState,
          customer.shippingAddressCountry
        )
      : billingAddress;

    customerInfo.get('shipTo').setValue(shippingAddress);

    // Update tax exemption status if available
    // if (customer.isTaxExempt !== undefined) {
    //   customerInfo.get('isTaxExempt').setValue(customer.isTaxExempt);
    // }
  }

  private formatAddress(...parts: (string | null)[]): string {
    return parts
      .filter(part => part && part.trim() !== '')
      .join(', ');
  }

  createItem(): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      description: ['',Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      amount: [0],
      oneTime:[false],
      taxable: [false]
    });
  }

  // Form control getters for cleaner template
  get orderInfo(): FormGroup {
    return this.salesOrderForm.get('orderInfo') as FormGroup;
  }

  get customerInfo(): FormGroup {
    return this.salesOrderForm.get('customerInfo') as FormGroup;
  }

  get customerControl() {
    return this.customerInfo.get('customer');
  }

  get notes(): FormGroup {
    return this.salesOrderForm.get('notes') as FormGroup;
  }

  get summary(): FormGroup {
    return this.salesOrderForm.get('summary') as FormGroup;
  }

  get items(): FormArray {
    return this.salesOrderForm.get('items') as FormArray;
  }

  goBack() {
    // this.router.navigate(['../']); // Navigate to the previous route
    this.location.back();
  }
  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  calculateTotals(): void {
    let subtotal = 0;
    let taxableAmount = 0;
    // const taxRate = this.customerInfo.get('isTaxExempt').value
    //   ? 0
    //   : this.summary.get('taxRate').value / 100;
    const taxRate= this.summary.get('taxRate').value / 100;
    this.items.controls.forEach(item => {
      const quantity = item.get('quantity').value || 0;
      const rate = item.get('rate').value || 0;
      const amount = quantity * rate;
      item.get('amount').setValue(amount, { emitEvent: false });
      subtotal += amount;

      if (item.get('taxable').value) {
        taxableAmount += amount;
      }
    });

    const tax = taxableAmount * taxRate;
    const total = subtotal + tax;

    this.summary.patchValue({
      subtotal: subtotal,
      tax: tax,
      total: total
    }, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.salesOrderForm.valid) {
      const formData = this.prepareFormData();
      console.log('Form submitted:', formData);
      console.log('Form submitted:', JSON.stringify(formData));

      // this.salesOrderService.addSalesOrder(formData).subscribe({
      //   next: (res) => {
      //     console.log(res, 'sales order');

      //     // Show success SweetAlert
      //     Swal.fire({
      //       icon: 'success',
      //       title: 'Sales Order Added!',
      //       text: 'Your sales order was successfully added.',
      //       confirmButtonText: 'Okay'
      //     }).then(() => {
      //       // Redirect back to the desired page after closing the alert
      //       this.goBack()  // Replace with the path you want to navigate to
      //     });

      //   },
      //   error: (err) => {
      //     console.log(err, 'err');
      //     // Show error SweetAlert
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Oops...',
      //       text: 'Something went wrong. Please try again later.',
      //       confirmButtonText: 'Okay'
      //     });
      //   }
      // });

      // Send formData to your backend service here
    } else {
      this.markFormGroupTouched(this.salesOrderForm);
    }
  }

  private prepareFormData(): any {
    return {
      ...this.salesOrderForm.value,
      // Add any additional transformations here
    };
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      }
    });
  }
}
