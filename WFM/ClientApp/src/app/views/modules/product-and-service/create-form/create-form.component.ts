import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsAndServicesService } from '../services/products-and-services.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
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
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'itemType', label: 'Item Type', type: 'select', options: ['Service', 'Product'] },
        { key: 'sku', label: 'SKU', type: 'text' },
        { key: 'category', label: 'Category', type: 'text' }
      ]
    },
    {
      title: 'Sales',
      key: 'sales',
      fields: [
        { key: 'isSelling', label: 'I sell this service to my customers', type: 'checkbox' },
        { key: 'description', label: 'Description', type: 'textarea', condition: 'isSelling' },
        { key: 'price', label: 'Price/Rate', type: 'number', condition: 'isSelling' },
        { key: 'incomeAccount', label: 'Income Account', type: 'select', options: ['Sales', 'Revenue'], condition: 'isSelling' },
        { key: 'salesTaxCategory', label: 'Sales Tax Category', type: 'select', options: ['Taxable–standard rate', 'Non-Taxable'], condition: 'isSelling' }
      ]
    },
    {
      title: 'Purchasing',
      key: 'purchasing',
      fields: [
        { key: 'isPurchasing', label: 'I purchase this service from a vendor', type: 'checkbox' },
        { key: 'purchaseDescription', label: 'Purchase description', type: 'textarea', condition: 'isPurchasing' },
        { key: 'purchaseCost', label: 'Purchase cost', type: 'number', condition: 'isPurchasing' },
        { key: 'expenseAccount', label: 'Expense account', type: 'select', options: ['Purchases', 'General Expenses'], condition: 'isPurchasing' },
        { key: 'preferredVendor', label: 'Preferred vendor', type: 'select', options: ['Vendor A', 'Vendor B', 'Vendor C'], condition: 'isPurchasing' }
      ]
    }
  ];
  product = [
    {
      title: 'Basic Info',
      key: 'basicInfo',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'itemType', label: 'Item Type', type: 'select', options: ['Service', 'Product'] },
        { key: 'sku', label: 'SKU', type: 'text' },
        { key: 'category', label: 'Category', type: 'text' }
      ]
    },
    {
      title: 'Inventory Info',
      key: 'inventoryInfo',
      fields: [
        { key: 'initialQuantity', label: 'Initial quantity on hand', type: 'text' },
        { key: 'date', label: 'As of date', type: 'date' },
        { key: 'reorderPoint', label: 'Reorder point', type: 'number' },
        { key: 'inventoryAssetAccount', label: 'Inventory asset account', type: 'select',options: ['Inventory Asset'] }
      ]
    },
    {
      title: 'Sales',
      key: 'sales',
      fields: [
        // { key: 'isSelling', label: 'I sell this service to my customers', type: 'checkbox' },
        { key: 'description', label: 'Description', type: 'textarea',  },
        { key: 'price', label: 'Price/Rate', type: 'number',  },
        { key: 'incomeAccount', label: 'Income Account', type: 'select', options: ['Sales', 'Revenue'],  },
        { key: 'salesTaxCategory', label: 'Sales Tax Category', type: 'select', options: ['Taxable–standard rate', 'Non-Taxable'],  }
      ]
    },
    {
      title: 'Purchasing',
      key: 'purchasing',
      fields: [
        // { key: 'isPurchasing', label: 'I purchase this service from a vendor', type: 'checkbox' },
        { key: 'purchaseDescription', label: 'Purchase description', type: 'textarea',  },
        { key: 'purchaseCost', label: 'Purchase cost', type: 'number',  },
        { key: 'expenseAccount', label: 'Expense account', type: 'select', options: ['Purchases', 'General Expenses'],  },
        { key: 'preferredVendor', label: 'Preferred vendor', type: 'select', options: ['Vendor A', 'Vendor B', 'Vendor C'],  }
      ]
    }
  ];

  nameAndContactForm(key: string): FormGroup {
    return this.parentForm.get(key) as FormGroup;
  }

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private location: Location,private productsAndServicesService:ProductsAndServicesService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemId = params['itemId'];
      this.itemType = params['itemType'];

      console.log('Item ID:', this.itemId);
      console.log('Item Type:', this.itemType);

      this.initializeForm();
    });


    // this.parentForm = this.fb.group({
    //   basicInfo: this.fb.group({
    //     name: [''],
    //     itemType: ['Service'],
    //     sku: [''],
    //     category: ['']
    //   }),
    //   sales: this.fb.group({
    //     isSelling: [false],
    //     description: [''],
    //     price: [''],
    //     incomeAccount: ['Sales'],
    //     salesTaxCategory: ['Taxable–standard rate']
    //   }),
    //   purchasing: this.fb.group({
    //     isPurchasing: [false],
    //     purchaseDescription: [''],
    //     purchaseCost: [''],
    //     expenseAccount: ['Purchases'],
    //     preferredVendor: ['']
    //   })
    // });
  }

  initializeForm() {
    let selectedSections = this.itemType === 'Service' ? this.service : this.product;

    let formGroupConfig: any = {};

    selectedSections.forEach(section => {
      let sectionGroup: any = {};
      section.fields.forEach(field => {
        sectionGroup[field.key] = [field.type === 'checkbox' ? false : '']; // Default values
      });

      formGroupConfig[section.key] = this.fb.group(sectionGroup);
    });

    this.parentForm = this.fb.group(formGroupConfig);

    // If itemType is "Product", patch values into "Basic Info"
  if (this.itemType === 'Product') {
    this.parentForm.get('basicInfo')?.patchValue({
      // name: 'Default Product Name',
      itemType: 'Product',
      // sku: 'P12345',
      // category: 'Default Category'
    });
  }
  if (this.itemType === 'Service') {
    this.parentForm.get('basicInfo')?.patchValue({
      // name: 'Default Product Name',
      itemType: 'Service',
      // sku: 'P12345',
      // category: 'Default Category'
    });
  }

  }

  submit() {
    console.log('Final Form Data:', {...this.parentForm.value,inventoryInfo:null});
    console.log('Final Form Data:', JSON.stringify(this.parentForm.value));
    if(this.itemType=="Service"){
      this.productsAndServicesService.createService({...this.parentForm.value,inventoryInfo:null}).subscribe({
        next:(res)=>{
          console.log(res,'res');

        },
        error:(error)=>{
          console.log(error,'error');

        }
      })
    }else{
      this.productsAndServicesService.createService(this.parentForm.value).subscribe({
        next:(res)=>{
          console.log(res,'res');

        },
        error:(error)=>{
          console.log(error,'error');

        }
      })
    }
  }
  goBack() {
    this.location.back(); // Navigate to the previous page
  }
}
