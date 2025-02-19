// Updated DataTableComponent with column filter toggle fix
import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { EditSettingsModel, PageSettingsModel, ToolbarItems, ColumnModel, GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: ColumnModel[] = [];
  @Input() pageSettings: PageSettingsModel = {
    pageSize: 5,
    pageCount: 5,
    currentPage: 1,
    pageSizes: [5, 10, 20, 50],
    enableQueryString: false
  };
  @Input() toolbar: ToolbarItems[] = ['Search'];
  @Input() allowSorting = false;
  @Input() allowPaging = false;
  @Input() allowFiltering = false;
  @Input() globalSearch = false;
  @Input() columnFilters = false;
  @Input() showCheckbox = false;
  @Input() showActionColumn = false;
  @Input() actionColumnTitle = 'Actions';
  @Input() editSettings: EditSettingsModel = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal' };
  @Input() updateRowId: number | null = null;

  @Output() rowSelected = new EventEmitter<any>();
  @Output() checkBoxSelectedIds = new EventEmitter<any[]>();
  @Output() actionClicked = new EventEmitter<{action: string, rowData: any}>();

  @ContentChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;
  @ViewChild('grid') public grid!: GridComponent;

  onAction(action: string, rowData: any) {
    this.actionClicked.emit({ action, rowData });
  }

  get filteredColumns(): ColumnModel[] {
    return this.columns.map(col => ({
      ...col,
      showColumnMenu: this.columnFilters,
      allowFiltering: this.columnFilters ? col.allowFiltering !== false : false
    }));
  }

  // get filteredColumns(): ColumnModel[] {
  //   const actionColumn: ColumnModel = {
  //     field: 'actions',
  //     headerText: this.actionColumnTitle,
  //     textAlign: 'Center',
  //     width: 120,
  //     template: `<button ejs-button (click)="onActionClick('edit', ${this.data})">Edit</button>&nbsp;<button ejs-button (click)="onActionClick('delete', ${this.data})">Delete</button>`,
  //     allowFiltering: false,
  //     allowSorting: false
  //   };
    
  //   const displayColumns = this.columns.map(col => ({
  //     ...col,
  //     showColumnMenu: this.columnFilters,
  //     allowFiltering: this.columnFilters ? col.allowFiltering !== false : false
  //   }));
    
  //   if (this.showActionColumn) {
  //     displayColumns.push(actionColumn);
  //   }
  //   return displayColumns;
  // }
  ngAfterViewInit() {
    this.hideDefaultColumns(); // Hide default columns on component load
  }

  hideDefaultColumns() {
    this.columns.forEach(col => {
      if (col.visible === false) {
        this.grid.hideColumns(col.field);
      }
    });
  }

  toggleColumnVisibility(field: string) {
    const column = this.columns.find(col => col.field === field);
    if (column) {
      column.visible = !column.visible;
      if (column.visible) {
        this.grid.showColumns(field);
      } else {
        this.grid.hideColumns(field);
      }
    }
  }
  onActionClick(action: string, rowData: any) {
    this.actionClicked.emit({ action, rowData });
  }

  onRowSelected(event: any) {
    this.rowSelected.emit(event.data);
  }

  public selectedIds: number[] = []; // Track selected row IDs

  // Handle individual row selection
  onCheckboxClick(rowId: number, event: any) {
    if (event.checked) {
      this.selectedIds.push(rowId);
      this.checkBoxSelectedIds.emit(this.selectedIds);
    } else {
      this.selectedIds = this.selectedIds.filter(id => id !== rowId);
      this.checkBoxSelectedIds.emit(this.selectedIds);
    }
    console.log("Selected IDs:", this.selectedIds);
  }

  // Handle "Select All" checkbox
  onSelectAll(event: any) {
    if (event.checked) {
      this.selectedIds = this.data.map(row => row.id); // Select all IDs
      this.checkBoxSelectedIds.emit(this.selectedIds);
    } else {
      this.selectedIds = []; // Deselect all
      this.checkBoxSelectedIds.emit(this.selectedIds);
    }
    console.log("All Selected IDs:", this.selectedIds);
  }

  // Check if an ID is selected (for binding)
  isChecked(rowId: number): boolean {
    return this.selectedIds.includes(rowId);
  }
}
