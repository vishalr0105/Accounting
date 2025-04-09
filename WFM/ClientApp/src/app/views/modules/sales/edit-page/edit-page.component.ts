import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inputs } from '@syncfusion/ej2-angular-grids/src/grid/grid.component';
import { CustomersService } from '../../customers/service/customers.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../customers/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../salesServices/invoices.service';
import { EstimatesService } from '../salesServices/estimates.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  @Input() title!: string;
  @Output() formSubmit = new EventEmitter<any>();
  invoiceForm!: FormGroup;
  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private invoicesService: InvoicesService,
    private estimatesService: EstimatesService
  ) {
    this.loadCustomers();
  }

  // -------------------------------------
  customers: any[] = [];

  customerNote = 'Thank you for your business and have a great day!';
  internalNote = '';
  statementMemo = '';
  paymentInstructions = '';

  discountType: 'percentage' | 'fixed' = 'percentage';
  discountValue: number = 0;
  taxRate: number = 0;
  productOptions: any;

  selectedFile: File | null = null;
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.size <= 20 * 1024 * 1024) {
      // 20MB limit
      this.selectedFile = file;
      this.invoiceForm.patchValue({ attachments: file });
    } else {
      alert('File size exceeds 20 MB limit.');
      event.target.value = ''; // Reset file input
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.invoiceForm.patchValue({ attachments: null });
  }
  pageType:any
  ngOnInit(): void {
    console.log('test');
    this.route.data.subscribe((data) => {
      this.pageType = data['pageType']; // Get the pageType from route data
      console.log('Page Type:', this.pageType);
    });
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log(orderId, 'orderId');
    if(this.pageType == 'estimation'){
      if (orderId) {
        this.estimatesService.viewEstimate(orderId).subscribe({
          next: (res) => {
            console.log(res, 'res');
            this.populateInvoiceForm(res);
          },
          error: (err) => {
            console.log(err, 'err');
          },
        });
      }
    }
    if(this.pageType == 'invoice'){
      if (orderId) {
        this.invoicesService.viewInvoice(orderId).subscribe({
          next: (res) => {
            console.log(res, 'res');
            this.populateInvoiceForm(res);
          },
          error: (err) => {
            console.log(err, 'err');
          },
        });
      }
    }

    this.initializeForm();
    this.invoiceForm.valueChanges.subscribe((updatedFormData) => {
      if (this.invoiceForm.valid) {
        this.formSubmit.emit({ data: updatedFormData, isValid: true });
      } else {
        this.formSubmit.emit({ data: updatedFormData, isValid: false });
      }
      Object.keys(this.invoiceForm.controls).forEach(controlName => {
        const control = this.invoiceForm.get(controlName);
        if (control?.invalid) {
          console.log(`${controlName} is invalid`);
        }
      });
    });
  }

  initializeForm() {
    this.invoiceForm = this.fb.group({
      companyName: ['Sandbox Company_US_2',[Validators.required]],
      companyAddress: ['123 Sierra Way, San Pablo CA 87999',[Validators.required]],
      balanceDue: [0.0,[Validators.required]],
      selectedCustomer: ['', Validators.required],
      email: ['',[Validators.email,Validators.required]], // Added name field
      name: ['',[Validators.required]], // Added email field
      phoneNumber: [''], // Added phoneNumber field
      unbilledCharges: [0], // Added unbilledCharges field
      terms: ['Net 30',[Validators.required]],
      date: [new Date().toISOString().split('T')[0],[Validators.required]],
      dueDate: [
        new Date(new Date().setDate(new Date().getDate() + 30))
          .toISOString()
          .split('T')[0],[Validators.required]
      ],
      // originalEmail: [''],
      // validationStatus: [''],
      // syncToken: [''],
      tags: [''],
      customerNote: ['Thank you for your business and have a great day!'],
      paymentInstructions: [''],
      note: [''],
      statementMemo: [''],
      items: this.fb.array([]), // Initialize invoice items
      selectedTaxRate: [0.08], // Default tax rate
      subtotal: [0],
      taxableSubtotal: [0],
      salesTax: [0],
      invoiceTotal: [0],
      attachments: [null],
    });

    this.onCustomerChange(this.invoiceForm.get('selectedCustomer').value);
    this.addProduct();
  }

  populateInvoiceForm(invoice: any): void {
    if (this.customers.length != 0) {
      this.invoiceForm.patchValue({
        companyName: invoice.companyName,
        companyAddress: invoice.companyAddress,
        balanceDue: invoice.balanceDue,
        selectedCustomer: invoice.selectedCustomer.id,
        terms: invoice.terms,
        date: invoice.invoiceDate.split('T')[0], // assuming the date format in the response
        dueDate: invoice.dueDate.split('T')[0], // assuming the date format in the response
        customerNote: invoice.customerNote,
        paymentInstructions: invoice.paymentInstructions,
        statementMemo: invoice.statementMemo,
        selectedTaxRate: invoice.selectedTaxRate,
        subtotal: invoice.subtotal,
        taxableSubtotal: invoice.taxableSubtotal,
        salesTax: invoice.salesTax,
        invoiceTotal: invoice.invoiceTotal,
        attachments: invoice.attachments,
      });

      this.onCustomerChange(this.invoiceForm.get('selectedCustomer').value);
      this.patchItems(invoice.items);
      // Recalculate totals after setting values
      this.calculateTotals();
    }
  }

  patchItems(items: any[]): void {
    const itemsArray = this.invoiceForm.get('items') as FormArray;
    // Clear the existing items (if necessary)
    itemsArray.clear();
    // Add the items to the FormArray
    items.forEach((item) => {
      itemsArray.push(
        this.fb.group({
          product: [item.product, Validators.required],
          description: [item.description],
          qty: [item.qty, [Validators.required, Validators.min(1)]],
          rate: [item.rate, [Validators.required, Validators.min(0)]],
          tax: [item.tax],
        })
      );
    });

    // Recalculate totals after setting items
    this.calculateTotals();
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addProduct() {
    const item = this.fb.group({
      product: ['', Validators.required],
      description: [''],
      qty: [1, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      tax: [false],
    });
    this.items.push(item);
    this.calculateTotals();
  }

  onCustomerChange(customerId: string) {
    // Find the selected customer from your customers list based on the selected ID
    const selectedCustomer = this.customers.find(
      (customer) => customer.id === customerId
    );
    if (selectedCustomer) {
      // Patch the form fields with the corresponding customer data
      this.invoiceForm.patchValue({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phoneNumber: selectedCustomer.phoneNumber,
        unbilledCharges: selectedCustomer.unbilledCharges,
      });
    }
  }

  showSideBar: boolean = false;
  showSideBarRight: boolean = false;
  sideBar() {
    this.showSideBar = !this.showSideBar;
  }
  activeTab: string = 'edit'; // Default Active Tab

  sideBarRight() {
    this.showSideBarRight = !this.showSideBarRight;
  }

  taxRates = [
    { label: 'No Tax (0%)', value: 0 },
    { label: 'Sales Tax (8%)', value: 0.08 },
    { label: 'VAT (12%)', value: 0.12 },
  ];
  deleteProduct(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  clearProducts() {
    this.items.clear();
    this.calculateTotals();
  }

  calculateTotals() {
    let subtotal = 0;
    let taxableSubtotal = 0;

    this.items.controls.forEach((item: any) => {
      const qty = item.get('qty').value;
      const rate = item.get('rate').value;
      const isTaxable = item.get('tax').value;

      const amount = qty * rate;
      subtotal += amount;
      if (isTaxable) {
        taxableSubtotal += amount;
      }
    });

    const selectedTaxRate = this.invoiceForm.get('selectedTaxRate')?.value;
    const salesTax = taxableSubtotal * selectedTaxRate;
    const invoiceTotal = subtotal + salesTax;

    this.invoiceForm.patchValue({
      subtotal,
      taxableSubtotal,
      salesTax,
      invoiceTotal,
    });
  }
  loadCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
    this.productService.getProducts().subscribe((res) => {
      this.productOptions = res;
    });
  }

  saveInvoice() {
    console.log('Invoice Saved:', this.invoiceForm.value);
  }

  reviewAndSend() {
    console.log('Reviewing and Sending Invoice...');
  }

  emitFormData() {
    this.formSubmit.emit(this.invoiceForm.value);
  }
}
