import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inputs } from '@syncfusion/ej2-angular-grids/src/grid/grid.component';
import { CustomersService } from '../../customers/service/customers.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  @Input() title!:string;
  @Output() formSubmit = new EventEmitter<FormGroup>();
  invoiceForm!: FormGroup;
  constructor(private customersService:CustomersService,private fb: FormBuilder) { }

  // -------------------------------------

  customers: any[] = [];



  customerNote = 'Thank you for your business and have a great day!';
  internalNote = '';
  statementMemo = '';
  paymentInstructions = '';


  discountType: 'percentage' | 'fixed' = 'percentage';
  discountValue: number = 0;
  taxRate: number = 0;
  productOptions = ['Bricks', 'Hours', 'Mobile', 'Sales'];

  selectedFile: File | null = null;
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.size <= 20 * 1024 * 1024) { // 20MB limit
      this.selectedFile = file;
      this.invoiceForm.patchValue({ attachments: file });
    } else {
      alert("File size exceeds 20 MB limit.");
      event.target.value = ''; // Reset file input
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.invoiceForm.patchValue({ attachments: null });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCustomers();
    this.invoiceForm.valueChanges.subscribe((updatedFormData) => {
      this.formSubmit.emit(updatedFormData);
    });
  }

  initializeForm() {
    this.invoiceForm = this.fb.group({
      companyName: ['Sandbox Company_US_2'],
      companyAddress: ['123 Sierra Way, San Pablo CA 87999'],
      balanceDue: ['$0.00'],
      // selectedCustomer: [null, Validators.required],
      selectedCustomer: this.fb.group({
        id: [null],
        name: [null],
        email: [''],
        phoneNumber: [''],
        unbilledCharges: [0]
      }),
      terms: ['Net 30'],
      invoiceDate: [new Date().toISOString().split('T')[0]],
      dueDate: [new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]],
      originalEmail: [''],
      validationStatus: [''],
      syncToken: [''],
      tags: [''],
      customerNote: ['Thank you for your business and have a great day!'],
      paymentInstructions: [''],
      internalNote:[''],
      statementMemo:[''],
      invoiceItems: this.fb.array([]),  // Initialize invoice items
      selectedTaxRate: [0.08], // Default tax rate
      subtotal: [0],
      taxableSubtotal: [0],
      salesTax: [0],
      invoiceTotal: [0],
      attachments: [null]
    });

    // Add Initial Items
    // this.addProduct();
    this.addProduct();
  }

  get invoiceItems(): FormArray {
    return this.invoiceForm.get('invoiceItems') as FormArray;
  }

  addProduct() {
    const item = this.fb.group({
      product: ['', Validators.required],
      description: [''],
      qty: [1, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      tax: [false]
    });
    this.invoiceItems.push(item);
    this.calculateTotals();
  }


  showSideBar:boolean=false
  showSideBarRight:boolean=false
  sideBar(){
    this.showSideBar=!this.showSideBar
  }
  activeTab: string = 'edit'; // Default Active Tab

  sideBarRight(){
    this.showSideBarRight=!this.showSideBarRight
  }

  taxRates = [
    { label: 'No Tax (0%)', value: 0 },
    { label: 'Sales Tax (8%)', value: 0.08 },
    { label: 'VAT (12%)', value: 0.12 }
  ];
  deleteProduct(index: number) {
    this.invoiceItems.removeAt(index);
    this.calculateTotals();
  }

  clearProducts() {
    this.invoiceItems.clear();
    this.calculateTotals();
  }

  calculateTotals() {
    let subtotal = 0;
    let taxableSubtotal = 0;

    this.invoiceItems.controls.forEach((item: any) => {
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
      invoiceTotal
    });
  }
  loadCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (response) => {
        this.customers=response
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
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
