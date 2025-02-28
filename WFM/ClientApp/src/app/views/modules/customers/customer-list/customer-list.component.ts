import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  segments = [
    { label: 'Estimates', displayTxt: 'Estimates', count: '$11.04', color: 'blue' },
    { label: 'Unbilled incomes', displayTxt: 'Unbilled incomes', count: '$53.09', color: 'purple' },
    { label: 'Overdue invoices', displayTxt: 'Overdue invoices', count: '$0.00', color: 'orange' },
    { label: 'Open invoices and credits', displayTxt: 'Open invoices and credits', count: '$0.00', color: 'gray' },
    { label: 'recently paid', displayTxt: 'recently paid', count: '$0.00', color: 'green' },
  ];

  onSegmentClick(label: string) {
    console.log('Segment clicked:', label);
    alert(`You clicked on ${label}`);
  }

  onDropdownSelection(selectedValue: any) {
    console.log('Selected:', selectedValue);
  }
  public items: { text: string }[] = [
    { text: 'Import customers' },
    { text: 'Multiple customers' },
  ];
  onSelect(args: any) {
    console.log('Selected Item:', args.item.text);
  }
  // DATA TABLE
  columnFields = [
    { field: 'name', header: 'Name',type: 'string' ,visible: true},
    { field: 'company', header: 'company Name' ,type: 'string',visible: true},
    { field: 'phone', header: 'phone',type: 'sttring' ,visible: true},
    { field: 'balance', header: 'Open Balance' ,type: 'number',visible: true},
  ];
  invoiceData = [
    { name: "Amy's Bird Sanctuary", company: "Advintek Consulting Services Sdn Bhd", phone: "(650) 555-", balance: 53.09 },
    { name: "Apple Care", company: "", phone: "(789) 987-7899", balance: 0.00 },
    { name: "Famous Transport", company: "", phone: "(988) 998-8998", balance: 11.04 }
  ];
  editSettings:EditSettingsModel = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal' };
    paginationSettings: PageSettingsModel = {
      pageSize: 10,
      pageCount: 5,
      currentPage: 1,
      pageSizes: [5, 10, 20, 50]
    };
      toolbar: ToolbarItems[] = ['Search' ,'ColumnChooser'];
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
