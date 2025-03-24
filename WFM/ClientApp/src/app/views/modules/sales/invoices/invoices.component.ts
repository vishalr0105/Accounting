import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { InvoicesService } from '../salesServices/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private invoiceService:InvoicesService) { }

  ngOnInit(): void {
    this.loadInvoices()
  }
  loadInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (response) => {
        console.log(response,'response');

        // this.invoiceData=response
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  segments = [
    { label: 'Overdue', displayTxt: 'Overdue', count: '$11.04', color: 'blue' },
    { label: 'Not due yet', displayTxt: 'Not due yet', count: '$53.09', color: 'purple' },
    { label: 'Not deposited', displayTxt: 'Not deposited', count: '$0.00', color: 'orange' },
    { label: 'Deposited', displayTxt: 'Deposited', count: '$0.00', color: 'gray' },
  ];

  onSegmentClick(label: string) {
    console.log('Segment clicked:', label);
    alert(`You clicked on ${label}`);
  }

  status=[
    {text:'All',value:'all'},
    {text:'Need attention',value:'need attention'},
    {text:'Unpaid',value:'unpaid'},
    {text:'Overdue',value:'overdue'},
    {text:'Not due',value:'not due'},
    {text:'Paid',value:'paid'},
    {text:'Not deposited',value:'not deposited'},
    {text:'Deposited',value:'deposited'},
  ]
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
    { text: '2023', value: '2023' }
  ];
  onDropdownSelection(selectedValue: any) {
    console.log('Selected:', selectedValue);
  }
  public items: { text: string }[] = [
    { text: 'Import invoices' },
  ];
  onSelect(args: any) {
    console.log('Selected Item:', args.item.text);
  }
  // DATA TABLE
  columnFields = [
    { field: 'date', header: 'DATE',type: 'date' ,visible: true},
    { field: 'no', header: 'NO.' ,type: 'number',visible: true},
    { field: 'customer', header: 'CUSTOMER' ,visible: true},
    { field: 'amount', header: 'AMOUNT' ,type: 'number',visible: true},
    { field: 'status', header: 'STATUS' ,type: 'string' ,visible: true},
  ];
  invoiceData = [
    {id:1, date: '12/26/24', no: '1014', customer: 'Famous Transport', amount: 11.04, status: 'Overdue 26 days', issue: 'Delivery issue' },
    {id:2, date: '1/8/25', no: '1023', customer: 'Amy\'s Bird Sanctuary', amount: 11.03, status: 'Due in 17 days', issue: 'Delivery issue' },
    {id:3, date: '1/12/25', no: '852', customer: 'Amy\'s Bird Sanctuary', amount: 11.03, status: 'Due in 21 days', issue: 'Viewed' }
  ];
  editSettings:EditSettingsModel = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal' };
    paginationSettings: PageSettingsModel = {
      pageSize: 10,
      pageCount: 5,
      currentPage: 1,
      pageSizes: [5, 10, 20, 50]
    };
      toolbar: ToolbarItems[] = [ 'ColumnChooser'];
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
        getMenuItems(event:Event ,rowData: any): MenuItemModel[] {
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
            { text: 'View activity', id: 'activity' }
          ];
        }
        closeSidebar() {
          this.isTableSidebarOpen = false;
        }
}
