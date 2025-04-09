import { Component, OnInit } from '@angular/core';
import {
  EditSettingsModel,
  PageSettingsModel,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';
import {
  MenuEventArgs,
  MenuItemModel,
} from '@syncfusion/ej2-angular-navigations';
import { InvoicesService } from '../../sales/salesServices/invoices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsAndServicesService } from '../services/products-and-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-and-service-page',
  templateUrl: './product-and-service-page.component.html',
  styleUrls: ['./product-and-service-page.component.scss'],
})
export class ProductAndServicePageComponent implements OnInit {
  invoiceData = [];

  constructor(
    private productsAndServicesService: ProductsAndServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }
  loadInvoices() {
    this.productsAndServicesService.getAllProductsServices().subscribe({
      next: (response) => {
        console.log(response, 'response');
        this.invoiceData = response;
        // this.invoiceData=response
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      },
    });
  }

  onSegmentClick(label: string) {
    console.log('Segment clicked:', label);
    alert(`You clicked on ${label}`);
  }

  onDropdownSelection(selectedValue: any) {
    console.log('Selected:', selectedValue);
  }
  public items: { text: string }[] = [
    { text: 'Service' },
    { text: 'Inventory item' },
  ];
  onSelect(args: any) {
    console.log('Selected Item:', args.item.text);
    if (args.item.text == 'Service') {
      this.router.navigate(['/create-form'], {
        relativeTo: this.route, // Keeps current route
        queryParams: { itemId: 'new', itemType: 'Service' },
        queryParamsHandling: 'merge', // Merges new params with existing ones
      });
    } else if (args.item.text == 'Inventory item') {
      this.router.navigate(['/create-form'], {
        relativeTo: this.route, // Keeps current route
        queryParams: { itemId: 'new', itemType: 'Product' },
        queryParamsHandling: 'merge', // Merges new params with existing ones
      });
    }
  }
  // DATA TABLE
  columnFields = [
    { field: 'name', header: 'Name', type: 'string', visible: true },
    {
      field: 'initialQty',
      header: 'QTY ON HAND.',
      type: 'string',
      visible: true,
    },
    { field: 'category', header: 'CATEGORY', visible: true },
    { field: 'sku', header: 'SKU', type: 'string', visible: true },
    { field: 'itemType', header: 'TYPE', type: 'string', visible: true },
    { field: 'salesPrice', header: 'PRICE', type: 'string', visible: true },
    { field: 'purchaseCost', header: 'COST', type: 'string', visible: true },
  ];
  editSettings: EditSettingsModel = {
    allowEditing: false,
    allowAdding: false,
    allowDeleting: false,
    mode: 'Normal',
  };
  paginationSettings: PageSettingsModel = {
    pageSize: 10,
    pageCount: 5,
    currentPage: 1,
    pageSizes: [5, 10, 20, 50],
  };
  toolbar: ToolbarItems[] = ['ColumnChooser', 'Search'];
  public updateRowId: number | null = null;
  onCustomAction(action: string, rowData: any) {
    event.stopPropagation(); // Prevent row selection
    event.preventDefault();
    if (action === 'edit') {
      this.updateRowId = rowData.id; // Set current row to edit mode
      console.log('Editing:', rowData);
      this.router.navigate(['/create-form'], {
        relativeTo: this.route, // Keeps current route
        queryParams: { itemId: rowData.id, itemType: rowData.itemType },
        queryParamsHandling: 'merge', // Merges new params with existing ones
      });
    } else if (action === 'update') {
      console.log('Updating:', rowData);
      this.updateRowId = null; // Exit edit mode after updating
    } else if (action === 'delete') {
      console.log('Deleting:', rowData);
      // Your delete logic here
    }else if (action == 'inactive') {
      Swal.fire({
        title: 'Make this item/variants inactive?',
        html: `<p>Here’s what happens:</p>
               <ul style="text-align:left">
                 <li>You can’t edit it or things like past invoices, bills, or refunds.</li>
                 <li>It’s marked as deleted but can be activated for new transactions.</li>
               </ul>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Make inactive',
        cancelButtonText: 'Cancel',
        reverseButtons: true, // Places cancel button first
      }).then((result) => {
        if (result.isConfirmed) {
          this.productsAndServicesService.inactivateProductsorServices(rowData.id).subscribe({
            next: (res) => {
              console.log('Inactive Response:', res);
              this.loadInvoices();
              Swal.fire({
                title: 'Success!',
                text: 'The item has been marked as inactive.',
                icon: 'success',
                confirmButtonText: 'OK',
              });
            },
            error: (err) => {
              console.error('Error:', err);
              Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            },
          });
        }
      });
    }

  }
  onCheckBoxSelectedIds(selectedIds: number[]) {
    console.log('Selected IDs:', selectedIds);
  }

  isTableSidebarOpen = false;
  onRowSelected(rowData: any) {
    this.isTableSidebarOpen = true;
    console.log('Selected Row:', rowData);
  }
  onMenuSelect(event: MenuEventArgs, rowData: any) {
    const clickedAction = event.item.id;
    console.log(`Clicked Action: ${clickedAction}`);
    console.log('Row Data:', rowData);

    // Perform action based on clicked menu item
    this.onCustomAction(clickedAction, rowData);
  }
  menuItems: any[] = [];
  getMenuItems(event: Event, rowData: any): MenuItemModel[] {
    event.stopPropagation(); // Prevent row selection
    event.preventDefault();
    return [
      // { text: 'View/Edit', id: 'edit' },
      { text: 'Make inactive', id: 'inactive' },
      // { text: 'Duplicate', id: 'duplicate' },
      // { text: 'Send', id: 'send' },
      // { text: 'Share invoice link', id: 'share' },
      // { text: 'Print packing slip', id: 'print' },
      // { text: 'Void', id: 'void' },
      // { text: 'Delete', id: 'delete' },
      // { text: 'View activity', id: 'activity' }
    ];
  }
  closeSidebar() {
    this.isTableSidebarOpen = false;
  }
}
