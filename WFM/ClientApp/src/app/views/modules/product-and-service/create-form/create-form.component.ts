import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsAndServicesService } from '../services/products-and-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  parentForm!: FormGroup;
  itemId: string | null = null;
  itemType: string | null = null;

  // Define sections dynamically
  service = [
    {
      title: 'Basic Info',
      key: 'basicInfo',
      fields: [
        { key: 'name', label: 'Name', type: 'text',validators: [Validators.required, Validators.minLength(3)] },
        {
          key: 'itemType',
          label: 'Item Type',
          type: 'select',
          options: ['Service', 'Product'],
          validators: [Validators.required]
        },
        { key: 'sku', label: 'SKU', type: 'text' ,validators: [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]},
        { key: 'category', label: 'Category', type: 'text' ,validators: [Validators.required] },
      ],
    },
    {
      title: 'Sales',
      key: 'sales',
      fields: [
        {
          key: 'isSelling',
          label: 'I sell this service to my customers',
          type: 'checkbox',
          validators: [Validators.required]
        },
        {
          key: 'description',
          label: 'Description',
          type: 'textarea',
          condition: 'isSelling',
          validators: [Validators.required]
        },
        {
          key: 'price',
          label: 'Price/Rate',
          type: 'number',
          condition: 'isSelling',
          validators: [Validators.required]
        },
        {
          key: 'incomeAccount',
          label: 'Income Account',
          type: 'select',
          options: ['Sales', 'Revenue'],
          condition: 'isSelling',
          validators: [Validators.required]
        },
        {
          key: 'salesTaxCategory',
          label: 'Sales Tax Category',
          type: 'select',
          options: ['Taxable–standard rate', 'Non-Taxable'],
          condition: 'isSelling',
          validators: [Validators.required]
        },
      ],
    },
    {
      title: 'Purchasing',
      key: 'purchasing',
      fields: [
        {
          key: 'isPurchasing',
          label: 'I purchase this service from a vendor',
          type: 'checkbox',
          validators: [Validators.required]
        },
        {
          key: 'purchaseDescription',
          label: 'Purchase description',
          type: 'textarea',
          condition: 'isPurchasing',
          validators: [Validators.required]
        },
        {
          key: 'purchaseCost',
          label: 'Purchase cost',
          type: 'number',
          condition: 'isPurchasing',
          validators: [Validators.required]
        },
        {
          key: 'expenseAccount',
          label: 'Expense account',
          type: 'select',
          options: ['Purchases', 'General Expenses'],
          condition: 'isPurchasing',
          validators: [Validators.required]
        },
        {
          key: 'preferredVendor',
          label: 'Preferred vendor',
          type: 'select',
          options: ['Vendor A', 'Vendor B', 'Vendor C'],
          condition: 'isPurchasing',
          validators: [Validators.required]
        },
      ],
    },
  ];
  product = [
    {
      title: 'Basic Info',
      key: 'basicInfo',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        {
          key: 'itemType',
          label: 'Item Type',
          type: 'select',
          options: ['Service', 'Product'],
        },
        { key: 'sku', label: 'SKU', type: 'text' },
        { key: 'category', label: 'Category', type: 'text' },
      ],
    },
    {
      title: 'Inventory Info',
      key: 'inventoryInfo',
      fields: [
        {
          key: 'initialQuantity',
          label: 'Initial quantity on hand',
          type: 'text',
        },
        { key: 'date', label: 'As of date', type: 'date' },
        { key: 'reorderPoint', label: 'Reorder point', type: 'number' },
        {
          key: 'inventoryAssetAccount',
          label: 'Inventory asset account',
          type: 'select',
          options: ['Inventory Asset'],
        },
      ],
    },
    {
      title: 'Sales',
      key: 'sales',
      fields: [
        // { key: 'isSelling', label: 'I sell this service to my customers', type: 'checkbox' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'price', label: 'Price/Rate', type: 'number' },
        {
          key: 'incomeAccount',
          label: 'Income Account',
          type: 'select',
          options: ['Sales', 'Revenue'],
        },
        {
          key: 'salesTaxCategory',
          label: 'Sales Tax Category',
          type: 'select',
          options: ['Taxable–standard rate', 'Non-Taxable'],
        },
      ],
    },
    {
      title: 'Purchasing',
      key: 'purchasing',
      fields: [
        // { key: 'isPurchasing', label: 'I purchase this service from a vendor', type: 'checkbox' },
        {
          key: 'purchaseDescription',
          label: 'Purchase description',
          type: 'textarea',
        },
        { key: 'purchaseCost', label: 'Purchase cost', type: 'number' },
        {
          key: 'expenseAccount',
          label: 'Expense account',
          type: 'select',
          options: ['Purchases', 'General Expenses'],
        },
        {
          key: 'preferredVendor',
          label: 'Preferred vendor',
          type: 'select',
          options: ['Vendor A', 'Vendor B', 'Vendor C'],
        },
      ],
    },
  ];

  nameAndContactForm(key: string): FormGroup {
    return this.parentForm.get(key) as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private productsAndServicesService: ProductsAndServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.itemId = params['itemId'];
      this.itemType = params['itemType'];
      this.itemType = 'Service';

      console.log('Item ID:', this.itemId);
      console.log('Item Type:', this.itemType);

      this.initializeForm();
      this.fetchProductOrService();

      // Listen for changes to the itemType field
    this.parentForm.get('basicInfo.itemType')?.valueChanges.subscribe((newType) => {
      this.onItemTypeChange(newType);
    });
    });
  }

  onItemTypeChange(newType: string) {
    if (newType !== this.itemType) {
      this.itemType = newType; // Update component variable

      // Update URL without reloading the page
      this.router.navigate([], {
        queryParams: { itemId: this.itemId, itemType: this.itemType },
        queryParamsHandling: 'merge', // Merge with existing params
      });

      // Reinitialize the form with the new type
      this.initializeForm();
    }
  }

  initializeForm() {
    let selectedSections =
      this.itemType === 'Service' ? this.service : this.product;

    let formGroupConfig: any = {};

    selectedSections.forEach((section) => {
      let sectionGroup: any = {};
      section.fields.forEach((field) => {
        sectionGroup[field.key] = [field.type === 'checkbox' ? false : '']; // Default values
      });

      formGroupConfig[section.key] = this.fb.group(sectionGroup);
    });

    this.parentForm = this.fb.group(formGroupConfig);

    // Ensure at least one checkbox is checked by default
    this.parentForm.get('sales.isSelling')?.setValue(true); // Default to selling

    // Add validation to prevent both checkboxes from being unchecked
    this.parentForm.get('sales.isSelling')?.valueChanges.subscribe((value) => {
      if (!value && !this.parentForm.get('purchasing.isPurchasing')?.value) {
        this.parentForm.get('purchasing.isPurchasing')?.setValue(true);
      }
    });

    this.parentForm
      .get('purchasing.isPurchasing')
      ?.valueChanges.subscribe((value) => {
        if (!value && !this.parentForm.get('sales.isSelling')?.value) {
          this.parentForm.get('sales.isSelling')?.setValue(true);
        }
      });

    // If itemType is "Product", patch values into "Basic Info"
    if (this.itemType === 'Product') {
      this.parentForm.get('basicInfo')?.patchValue({
        itemType: 'Product',
      });
    }
    if (this.itemType === 'Service') {
      this.parentForm.get('basicInfo')?.patchValue({
        itemType: 'Service',
      });
    }
  }

  fetchProductOrService() {
    if (this.itemId=='new') return;
    this.productsAndServicesService
      .getProductAndServicesById(this.itemId)
      .subscribe({
        next: (res) => {
          if (!res) return;

           // Preserve user's selected itemType if changed manually
      const fetchedItemType = res.basicInfo?.itemType;
      const isTypeChanged = this.itemType && this.itemType !== fetchedItemType;

          // Only patch values if the form type matches the fetched data type
      // if (res.basicInfo?.itemType !== this.itemType) return;

          // Create a dynamic patch object
          let patchData: any = {
            basicInfo: res.basicInfo || {},
            sales: res.sales || {},
            purchasing: res.purchasing || {},
          };
          if (!isTypeChanged) {
            patchData.basicInfo.itemType = fetchedItemType;
          } else {
            patchData.basicInfo.itemType = this.itemType; // Retain user's selection
          }
          // Include inventoryInfo only if the item is a Product
          if (this.itemType === 'Product' && res.inventoryInfo) {
            patchData.inventoryInfo = res.inventoryInfo;
          }

          // Patch the form with fetched data
          this.parentForm.patchValue(patchData);
        },
        error: (err) => {
          console.log(err, 'err');
        },
      });
  }

  submit() {
    console.log(
      'Final Form Data:',
      JSON.stringify({ ...this.parentForm.value, inventoryInfo: null })
    );

    const isNew = this.itemId === 'new';
    const payload = { ...this.parentForm.value, inventoryInfo: null };
    const serviceCall = this.getServiceCall(isNew, payload);

    serviceCall.subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.showSuccessMessage(isNew);
      },
      error: (error) => {
        console.error('Error:', error);
        this.showErrorMessage();
      },
    });
  }

  // Determine the correct API call (Create or Update)
  private getServiceCall(isNew: boolean, payload: any) {
    if (isNew) {
      return this.itemType === 'Service'
        ? this.productsAndServicesService.createService(payload)
        : this.productsAndServicesService.createService(this.parentForm.value);
    } else {
      return this.itemType === 'Service'
        ? this.productsAndServicesService.updateProductAndServicesById(
            payload,
            this.itemId
          )
        : this.productsAndServicesService.updateProductAndServicesById(
            this.parentForm.value,
            this.itemId
          );
    }
  }

  // Show success message after API call
  private showSuccessMessage(isNew: boolean) {
    Swal.fire({
      title: 'Success!',
      text: `The ${this.itemType.toLowerCase()} has been successfully ${
        isNew ? 'added' : 'updated'
      }.`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      this.router.navigateByUrl(`/admin/products`);
    });
  }

  // Show error message in case of failure
  private showErrorMessage() {
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong while saving. Please try again later.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  goBack() {
    // this.location.back(); // Navigate to the previous page
    this.router.navigateByUrl(`/admin/products`);
  }
}
