import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../customers/service/customers.service';
import { ProductService } from '../../customers/service/product.service';
import { Location } from '@angular/common';
import { SalesOrderService } from '../salesServices/sales-order.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-order-new',
  templateUrl: './sales-order-new.component.html',
  styleUrls: ['./sales-order-new.component.scss'],
})
export class SalesOrderNewComponent implements OnInit {
  salesOrderForm: FormGroup;
  customers: any[] = [];
  productOptions: any[] = [];
  isLoading = true;
  orderId: any = null;
  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private productService: ProductService,
    private location: Location,
    private salesOrderService: SalesOrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      console.log(this.orderId, 'orderId');
      this.salesOrderService.viewSalesOrder(this.orderId).subscribe({
        next: (res) => {
          console.log(res, 'res');
          console.log(JSON.stringify(res), 'res');
          this.bindFormData(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.initForm();
    this.loadCustomers();
    this.loadProducts();
  }

  initForm(): void {
    this.salesOrderForm = this.fb.group({
      orderInfo: this.fb.group({
        orderDate: [
          new Date().toISOString().substring(0, 10),
          Validators.required,
        ],
        orderNumber: ['1001', Validators.required],
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
        internalNotes: [''],
      }),
      summary: this.fb.group({
        subtotal: [0],
        taxRate: [
          10,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        tax: [0],
        total: [0],
      }),
    });

    this.watchCustomerChanges();
    this.watchFormChanges();
  }

  bindFormData(response: any): void {
    // Bind order info
    this.orderInfo.patchValue({
      orderDate: response.orderInfo.orderDate
        ? response.orderInfo.orderDate.substring(0, 10)
        : '',
      orderNumber: response.orderInfo.orderNumber,
    });

    // Bind customer info
    this.customerInfo.patchValue({
      customer: response.customerInfo.customer
        ? response.customerInfo.customer
        : null,
      // contactInfo: '',
      // billTo: response.customerInfo.billTo,
      // shipTo: response.customerInfo.shipTo,
    });

    // Bind items (if there are any)
    if (response.items && response.items.length > 0) {
      const itemsFormArray = this.salesOrderForm.get('items') as FormArray;
      itemsFormArray.clear();
      response.items.forEach((item) => {
        itemsFormArray.push(
          this.fb.group({
            product: [item.product, Validators.required],
            description: [item.description, Validators.required],
            sku: [{ value: item.sku, disabled: true }],
            quantity: [item.quantity, [Validators.required, Validators.min(1)]],
            rate: [item.rate, [Validators.required, Validators.min(0)]],
            amount: [item.amount],
            taxable: [item.taxable],
          })
        );
      });
    }

    // Bind notes
    this.notes.patchValue({
      customerNotes: response.notes.customerNotes,
      internalNotes: response.notes.internalNotes,
    });

    // Bind summary (subtotal, tax, total)
    this.summary.patchValue({
      subtotal: response.summary.subtotal,
      taxRate: response.summary.taxRate * 100, // Assuming tax rate is in decimal, so multiply by 100 to show percentage
      tax: response.summary.tax,
      total: response.summary.total,
    });
    this.updateCustomerFields(response.customerInfo.customer);
    this.watchCustomerChanges();
  }

  watchCustomerChanges(): void {
    this.customerControl.valueChanges.subscribe((customer) => {
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
      (error) => {
        console.error('Error loading customers:', error);
        this.isLoading = false;
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.productOptions = res;
    });
  }

  updateCustomerFields(customer: any): void {
    const customerInfo = this.customerInfo;
    if (this.customers.length != 0) {
      const selectedCustomer = this.customers.find(
        (customerData) => customerData.id == customer
      );
      console.log(selectedCustomer, 'selectedCustomer');

      // Update email
      customerInfo.get('contactInfo').setValue(selectedCustomer.email);

      // Update billing address
      const billingAddress = this.formatAddress(
        selectedCustomer.billingAddressFirstName,
        selectedCustomer.billingAddressLastName,
        selectedCustomer.billingAddressLine1,
        selectedCustomer.billingAddressLine2,
        selectedCustomer.billingAddressCity,
        selectedCustomer.billingAddressState,
        selectedCustomer.billingAddressCountry
      );
      customerInfo.get('billTo').setValue(billingAddress);

      // Update shipping address (fall back to billing if empty)
      const shippingAddress = selectedCustomer.shippingAddressLine1
        ? this.formatAddress(
            selectedCustomer.shippingAddressFirstName,
            selectedCustomer.shippingAddressLastName,
            selectedCustomer.shippingAddressLine1,
            selectedCustomer.shippingAddressLine2,
            selectedCustomer.shippingAddressCity,
            selectedCustomer.shippingAddressState,
            selectedCustomer.shippingAddressCountry
          )
        : billingAddress;

      customerInfo.get('shipTo').setValue(shippingAddress);
    }

    // Update tax exemption status if available
    // if (customer.isTaxExempt !== undefined) {
    //   customerInfo.get('isTaxExempt').setValue(customer.isTaxExempt);
    // }
  }

  private formatAddress(...parts: (string | null)[]): string {
    return parts.filter((part) => part && part.trim() !== '').join(', ');
  }

  createItem(): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      description: ['', Validators.required],
      sku: [{ value: '', disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      amount: [0],
      taxable: [false],
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
    const taxRate = this.summary.get('taxRate').value / 100;
    this.items.controls.forEach((item) => {
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

    this.summary.patchValue(
      {
        subtotal: subtotal,
        tax: tax,
        total: total,
      },
      { emitEvent: false }
    );
  }

  onSubmit(): void {
    console.log(this.salesOrderForm.value, 'this.salesOrderForm.valu');
    if (this.orderId != 'new') {
      if (this.salesOrderForm.valid) {
        const formData = this.prepareFormData();
        // console.log('Form submitted:', formData);
        // console.log('Form submitted:', JSON.stringify(formData));

        this.salesOrderService.updateSalesOrder(formData,this.orderId).subscribe({
          next: (res) => {
            console.log(res, 'sales order');

            // Show success SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Sales Order Added!',
              text: 'Your sales order was successfully updated.',
              confirmButtonText: 'Okay',
            }).then(() => {
              // Redirect back to the desired page after closing the alert
              this.goBack(); // Replace with the path you want to navigate to
            });
          },
          error: (err) => {
            console.log(err, 'err');
            // Show error SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again later.',
              confirmButtonText: 'Okay',
            });
          },
        });

        // Send formData to your backend service here
      } else {
        this.markFormGroupTouched(this.salesOrderForm);
      }
    } else {
      if (this.salesOrderForm.valid) {
        const formData = this.prepareFormData();
        console.log('Form submitted:', formData);
        console.log('Form submitted:', JSON.stringify(formData));

        this.salesOrderService.addSalesOrder(formData).subscribe({
          next: (res) => {
            console.log(res, 'sales order');

            // Show success SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Sales Order Added!',
              text: 'Your sales order was successfully added.',
              confirmButtonText: 'Okay',
            }).then(() => {
              // Redirect back to the desired page after closing the alert
              this.goBack(); // Replace with the path you want to navigate to
            });
          },
          error: (err) => {
            console.log(err, 'err');
            // Show error SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again later.',
              confirmButtonText: 'Okay',
            });
          },
        });

        // Send formData to your backend service here
      } else {
        this.markFormGroupTouched(this.salesOrderForm);
      }
    }
  }

  private prepareFormData(): any {
    return {
      ...this.salesOrderForm.value,
      // Add any additional transformations here
    };
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl) => {
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
