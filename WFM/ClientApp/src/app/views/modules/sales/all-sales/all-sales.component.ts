import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EditSettingsModel,
  PageSettingsModel,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';
import {
  MenuEventArgs,
  MenuItemModel,
} from '@syncfusion/ej2-angular-navigations';
import { AllSalesService } from '../salesServices/all-sales.service';
import { catchError, concatMap, map, of, shareReplay, switchMap } from 'rxjs';
import { CustomersService } from '../../customers/service/customers.service';
import { DataFetchService } from 'src/app/gloable-services/data-fetch.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.scss'],
})
export class AllSalesComponent implements OnInit {
  toolbar: ToolbarItems[] = ['Search', 'ColumnChooser'];
  columns = [
    { field: 'id', header: 'ID', type: 'number', visible: false },
    { field: 'customer', header: 'Customer', type: 'string', visible: true },
    { field: 'amount', header: 'Amount', type: 'number', visible: true },
    { field: 'date', header: 'Date', type: 'date', visible: true },
    { field: 'type', header: 'Type', type: 'string', visible: true },
  ];
  updatebtn: boolean = false;
  salesData: any[] = [];
  filteredData: any[] = [];
  totalCount: number = 0;
  chunkSize: number = 100; // Default chunk size
  currentPage: number = 1;
  currentPageRequested: number = 0;
  type: any = 'all';
  date: any = 'all';
  customer: any = 'all';

  sportsData: any = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router,
    private allSalesService: AllSalesService,
    private customersService: CustomersService,
    private dataFetchService:DataFetchService
  ) {
    console.log('totalCount', this.totalCount);
  }

  ngOnInit(): void {
    this.loadCustomerDropdownValues()
    this.fetchSalesData();
  }
  fetchSalesData(): void {
    this.salesData = [];
    this.filteredData = [];

    this.dataFetchService
      .fetchData(
        () => this.allSalesService.getAllSalesOrdersCount(this.type, this.date, this.customer),
        (chunkSize, page) => this.allSalesService.getAllSalesOrders(chunkSize, page, this.type, this.date, this.customer),
        this.chunkSize
      )
      .subscribe((data) => {
        this.salesData = [...this.salesData, ...data];
        this.filteredData = [...this.salesData];
        console.log('Unique types:', [...new Set(this.salesData.map((res) => res.type))]);
      });
  }
  loadCustomerDropdownValues(){
    this.customersService.getCustomers().subscribe({
      next: (res) => {
        this.sportsData = [{ text: 'All', value: 'all' }]; // Initial value

        // Map the response to the desired format [{ text: 'John Doe', value: 'john.doe@example.com' }]
        const transformedData = res.map((customer: any) => ({
          text: customer.firstName,
          value: customer.firstName,
        }));

        // Add the transformed data to sportsData
        this.sportsData = [...this.sportsData, ...transformedData];
      },
      error: (err) => {},
    });
  }
  editSettings: EditSettingsModel = {
    allowEditing: false,
    allowAdding: false,
    allowDeleting: false,
    mode: 'Normal',
  };
  paginationSettings: PageSettingsModel = {
    pageSize: 5,
    pageCount: 5,
    currentPage: 1,
    pageSizes: [5, 10, 20, 50],
    totalRecordsCount: 100,
  };
  public updateRowId: number | null = null;
  onCustomAction(action: string, rowData: any) {
    event.stopPropagation(); // Prevent row selection
    event.preventDefault();
    if (action === 'edit') {
      this.updateRowId = rowData.id; // Set current row to edit mode
      console.log('Editing:', rowData);
    } else if (action === 'update') {
      console.log('Updating:', rowData);
      this.updateRowId = null; // Exit edit mode after updating
    } else if (action === 'delete') {
      console.log('Deleting:', rowData);
      // Your delete logic here
    }
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
      { text: 'View/Edit', id: 'edit' },
      { text: 'Duplicate', id: 'duplicate' },
      { text: 'Send', id: 'send' },
      { text: 'Share invoice link', id: 'share' },
      { text: 'Print packing slip', id: 'print' },
      { text: 'Void', id: 'void' },
      { text: 'Delete', id: 'delete' },
      { text: 'View activity', id: 'activity' },
    ];
  }

  onEdit(id: number) {
    console.log('Edit clicked for ID:', id);
    // Add your edit logic here
  }

  segments = [
    {
      label: 'Estimates',
      displayTxt: 'Estimates',
      count: '$0.00',
      color: 'blue',
    },
    {
      label: 'Unbilled income',
      displayTxt: 'Unbilled income',
      count: '$0.00',
      color: 'purple',
    },
    {
      label: 'Overdue invoice',
      displayTxt: 'Overdue invoice',
      count: '$11.04',
      color: 'orange',
    },
    {
      label: 'Open invoices and credits',
      displayTxt: 'Open invoices',
      count: '$64.13',
      color: 'gray',
    },
    {
      label: 'Recently paid',
      displayTxt: 'Recently paid',
      count: '$0.00',
      color: 'green',
    },
  ];

  onSegmentClick(label: string) {
    console.log('Segment clicked:', label);
    alert(`You clicked on ${label}`);
  }

  dropdownItems = [
    { text: 'All transactions', value: 'all' },
    { text: 'Invoices', value: 'Invoice' },
    { text: 'Estimates', value: 'Estimate' },
    { text: 'Sales Order', value: 'SalesOrder' },
    { text: 'Recurring Payment', value: 'RecurringPayment' },
    // { text: 'Sales Receipts', value: 'sales_receipts' },
    // { text: 'Unbilled Income', value: 'unbilled_income' },
    // { text: 'Money received', value: 'money_received' },
    // { text: 'Recently paid', value: 'recently_paid' },
  ];
  dateRanges = [
    { text: 'All', value: 'all' },
    { text: 'Custom dates', value: 'custom' },
    { text: 'Today', value: 'today' },
    { text: 'Yesterday', value: 'yesterday' },
    { text: 'This week', value: 'this_week' },
    { text: 'Last week', value: 'last_week' },
    { text: 'This month', value: 'this_month' },
    { text: 'Last month', value: 'last_month' },
    { text: 'This quarter', value: 'this_quarter' },
    { text: 'Last quarter', value: 'last_quarter' },
    { text: 'Last 6 months', value: 'last_6_months' },
    { text: 'Last 12 months', value: 'last_12_months' },
    { text: 'Year to date', value: 'ytd' },
    { text: 'This year', value: 'this_year' },
    { text: '2024', value: '2024' },
    { text: '2023', value: '2023' },
  ];

  onDropdownSelection(selectedValue: any) {
    console.log('Selected:', selectedValue);
    this.type=selectedValue
    this.fetchSalesData();

  }


  onDropdownSelectionChange(value: string) {
    console.log('Selected Sport:', value);
    this.customer=value
    this.fetchSalesData();

  }

  public items: { text: string }[] = [
    { text: 'Invoice' },
    { text: 'Import invoices' },
    // { text: 'Payment' },
    { text: 'Estimate' },
    { text: 'Payment Link' },
    // { text: 'Sales Receipt' },
    // { text: 'Credit Memo' },
    // { text: 'Refund Receipt' },
    // { text: 'Delayed Credit' },
    // { text: 'Delayed Charge' },
    // { text: 'Time Activity' }
  ];

  onSelect(args: any) {
    console.log('Selected Item:', args.item.text);
    if (args.item.text == 'Invoice') {
      this.router.navigate(['/admin/sales/invoices']);
    } else if (args.item.text == 'Estimate') {
      this.router.navigate(['/admin/sales/estimates']);
    } else if (args.item.text == 'Payment Link') {
      this.router.navigate(['/admin/sales/paymentlinks']);
    } else if (args.item.text == 'Import invoices') {
      this.router.navigate(['/admin/sales/importdata']);
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
  closeSidebar() {
    this.isTableSidebarOpen = false;
  }

  handlePageChange(event: { currentPage: number; pageSize: number }) {
    console.log('Page Changed:', event);
    const { currentPage, pageSize } = event;

    // Perform necessary actions, like fetching new data from API
  }
  sortField: string = '';
  sortDirection: string = '';
  filterField: string = '';
  filterValue: string = '';
  // 🔹 Handle Sorting Change
  onSortingChange(event: { field: string; direction: string }) {
    console.log('Sorting Data:', event);
    // this.fetchData({ sortField: event.field, sortOrder: event.direction });
  }

  onFilteringChange(event: {
    field: string;
    value: string;
    matchCase: boolean;
    operator: string;
  }) {
    console.log('Filtering Data:', event);
    // this.fetchData({ filterField: event.field, filterValue: event.value, filterOperator: event.operator });
  }
}
