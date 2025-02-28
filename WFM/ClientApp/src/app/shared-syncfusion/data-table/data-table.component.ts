// Updated DataTableComponent with column filter toggle fix
import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild, SimpleChanges } from '@angular/core';
import { EditSettingsModel, PageSettingsModel, ToolbarItems, ColumnModel, GridComponent, SortEventArgs, FilterEventArgs, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: ColumnModel[] = [];
  @Input() totalRecords: number = 200;
  @Input() pageSettings: PageSettingsModel = {
    pageSize: 5,
    pageCount: 100,
    currentPage: 0,
    pageSizes: [5, 10, 20, 50],
    totalRecordsCount: 100,
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
  @Output() pageChanged = new EventEmitter<{ currentPage: number, pageSize: number }>();
  @Output() sortingChanged = new EventEmitter<{ field: string, direction: string }>();
  @Output() filteringChanged = new EventEmitter<{ field: string, value: string, matchCase: boolean, operator: string }>();
  @Output() searchValueChanged = new EventEmitter<string>();  

  @ContentChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;
  @ViewChild('grid') public grid!: GridComponent;

  onAction(event:Event ,action: string, rowData: any) {
    event.stopPropagation(); // Prevent row selection
    event.preventDefault();
    this.actionClicked.emit({ action, rowData });
  }
  updatePageSettings() {
    this.pageSettings = { ...this.pageSettings, totalRecordsCount: this.totalRecords };
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
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalRecords']) {
      // this.updatePageSettings();  // ✅ Runs when totalRecords changes
      console.log("🔄 totalRecords changed:", this.totalRecords);

      // ✅ Update totalRecordsCount dynamically
      // this.pageSettings = { ...this.pageSettings, totalRecordsCount: this.totalRecords };

      // ✅ Ensure Syncfusion Grid updates properly
      setTimeout(() => {
        if (this.grid) {
          this.updatePageSettings();
          console.log("✅ Grid refreshed with new totalRecordsCount:", this.pageSettings.totalRecordsCount);
        }
      },500);
    }
  }
  
  
  ngAfterViewInit() {
    // this.updatePageSettings();
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
    const isChecked = event.checked;
    // const checkbox = event.target as HTMLInputElement;
    if (isChecked) {
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
  // pagination
onActionComplete(event: any) {
  if (event.requestType === 'paging') {
    const currentPage = event.currentPage;
    const newPageSize = event.pageSize || this.pageSettings.pageSize;  // Get updated page size

    console.log("Updated Page:", currentPage);
    console.log("Updated Page Size:", newPageSize);

    // Update pageSettings to reflect the new page size
    this.pageSettings = { ...this.pageSettings, pageSize: newPageSize };

    // Emit to parent if needed
    this.pageChanged.emit({ currentPage, pageSize: newPageSize });
  }
}
  /** Handle Sorting & Filtering */
  onActionBegin(event: any) {
    if (event.requestType === 'searching') {
      console.log("🔍 Global Search Value:", event.searchString);
      this.searchValueChanged.emit(event.searchString);
    }
    if (event.requestType === 'sorting') {
      console.log("Sorting Event:", event);
      this.sortingChanged.emit({
        field: event?.columnName,
        direction: event?.direction
      });
    }

    if (event.requestType === 'filtering') {
      console.log("Filtering Event:", event);
      if (event?.currentFilterObject?.field && event?.currentFilterObject?.value !== undefined) {
        this.filteringChanged.emit({
          field: event.currentFilterObject.field,
          value: String(event.currentFilterObject.value), // Convert to string
          matchCase: event.currentFilterObject.matchCase || false,
          operator: event.currentFilterObject.operator || 'equal'
        });
      }
    }
  }
}
