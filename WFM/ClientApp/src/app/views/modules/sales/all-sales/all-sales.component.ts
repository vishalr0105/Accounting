import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.scss']
})
export class AllSalesComponent {
  toolbar: ToolbarItems[] = [ 'ColumnChooser'];
  columns = [
    { field: 'id', header: 'ID', type: 'number' ,visible: false},
    { field: 'name', header: 'Name', type: 'string' ,visible: true},
    { field: 'amount', header: 'Amount', type: 'number' ,visible: true},
    { field: 'date', header: 'Date', type: 'date' ,visible: true},
  ];
  updatebtn:boolean = false;
  salesData = [
    { id: 1, name: 'Order 1', amount: 150, date: '2024-02-10' },
    { id: 2, name: 'Order 2', amount: 250, date: '2024-02-12' },
    { id: 3, name: 'Order 3', amount: 350, date: '2024-02-15' },
    { id: 4, name: 'Order 4', amount: 350, date: '2024-02-15' },
    { id: 5, name: 'Order 5', amount: 350, date: '2024-02-15' },
    { id: 6, name: 'Order 6', amount: 350, date: '2024-02-15' },
    { id: 7, name: 'Order 7', amount: 350, date: '2024-02-15' },
    { id: 8, name: 'Order 8', amount: 350, date: '2024-02-15' },
  ];
  editSettings:EditSettingsModel = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal' };
  paginationSettings: PageSettingsModel = {
    pageSize: 10,
    pageCount: 5,
    currentPage: 1,
    pageSizes: [5, 10, 20, 50]
  };
  public updateRowId: number | null = null;
  onCustomAction(action: string, rowData: any) {
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
  getMenuItems(rowData: any): MenuItemModel[] {
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


  onEdit(id: number) {
    console.log('Edit clicked for ID:', id);
    // Add your edit logic here
  }

  onDelete(id: number) {
    console.log('Delete clicked for ID:', id);
    this.salesData = this.salesData.filter(item => item.id !== id);
  }



  segments = [
    { label: 'Estimates', displayTxt: 'Estimates', count: '$0.00', color: 'blue' },
    { label: 'Unbilled income', displayTxt: 'Unbilled income', count: '$0.00', color: 'purple' },
    { label: 'Overdue invoice', displayTxt: 'Overdue invoice', count: '$11.04', color: 'orange' },
    { label: 'Open invoices and credits', displayTxt: 'Open invoices', count: '$64.13', color: 'gray' },
    { label: 'Recently paid', displayTxt: 'Recently paid', count: '$0.00', color: 'green' }
  ];

  onSegmentClick(label: string) {
    console.log('Segment clicked:', label);
    alert(`You clicked on ${label}`);
  }


  dropdownItems = [
    { text: 'All transactions', value: 'all' },
    { text: 'Invoices', value: 'invoices' },
    { text: 'Estimates', value: 'estimates' },
    { text: 'Change orders', value: 'change_orders' },
    { text: 'Credit memos', value: 'credit_memos' },
    { text: 'Sales Receipts', value: 'sales_receipts' },
    { text: 'Unbilled Income', value: 'unbilled_income' },
    { text: 'Money received', value: 'money_received' },
    { text: 'Recently paid', value: 'recently_paid' }
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
    { text: '2023', value: '2023' }
  ];

  
  onDropdownSelection(selectedValue: any) {
    console.log('Selected:', selectedValue);
  }

  public sportsData = [
    { value: '1', text: 'Soccer' },
    { value: '2', text: 'Basketball' },
    { value: '3', text: 'Baseball' },
    { value: '4', text: 'Tennis' },
    { value: '5', text: 'Cricket' }
  ];

  selectedSport: string = ''; // Store selected value

  onDropdownSelectionChange(value: string) {
    this.selectedSport = value;
    console.log('Selected Sport:', value); // Log selected value
  }

  public items: { text: string }[] = [
    { text: 'Invoice' },
    { text: 'Import invoices' },
    { text: 'Payment' },
    { text: 'Estimate' },
    { text: 'Payment Link' },
    { text: 'Sales Receipt' },
    { text: 'Credit Memo' },
    { text: 'Refund Receipt' },
    { text: 'Delayed Credit' },
    { text: 'Delayed Charge' },
    { text: 'Time Activity' }
  ];

  onSelect(args: any) {
    console.log('Selected Item:', args.item.text);
  }
  
    onCheckBoxSelectedIds(selectedIds: number[]) {
      console.log('Selected IDs:', selectedIds);
    }

}