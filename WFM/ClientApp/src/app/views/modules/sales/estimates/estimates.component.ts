import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { EstimatesService } from '../salesServices/estimates.service';
import { Router } from '@angular/router';
import { catchError, concatMap, map, of, shareReplay, switchMap } from 'rxjs';
import { DataFetchService } from 'src/app/gloable-services/data-fetch.service';

@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.scss']
})
export class EstimatesComponent implements OnInit {
  estimates:any=[]
  filteredData: any[] = [];
  totalCount: number = 0;
  chunkSize: number = 100; // Default chunk size
  currentPage: number = 1;
  currentPageRequested: number = 0;
  status: any = 'all';
  date: any = 'all';
  statusDropdown:any=[]
  constructor(private estimateService:EstimatesService,private router:Router,private dataFetchService: DataFetchService) { }

  ngOnInit(): void {
    this.loadStatusDropdownValues()
    this.fetchEstimatesData()
  }
  fetchEstimatesData(): void {
    this.estimates = [];
    this.filteredData = [];

    this.dataFetchService
      .fetchData(
        () => this.estimateService.getEstimatesCount(this.status, this.date),
        (chunkSize, page) => this.estimateService.getEstimates(chunkSize, page, this.status, this.date),
        this.chunkSize
      )
      .subscribe((data) => {
        this.estimates = [...this.estimates, ...data];
        this.filteredData = [...this.estimates];
      });
  }

      loadStatusDropdownValues(){
        this.estimateService.getEstimatesStaus().subscribe({
          next:(res)=>{
            console.log('res',res);
            this.statusDropdown=[{ text: 'All', value: 'all' }]
            res.forEach((status: string) => {
              this.statusDropdown.push({ text: status, value: status });
            });
          },
          error:(err)=>{
            console.log('err',err);

          }
        })
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
  onDropdownSelectionStatus(selectedValue: any) {
    console.log('Selected:', selectedValue)
    if(this.status!=selectedValue){
      this.status=selectedValue
      this.fetchEstimatesData()
    }
  }
  onDropdownSelection(selectedValue:any){
    console.log('Selected:', selectedValue)
    if(this.date!=selectedValue){
      this.date=selectedValue
      this.fetchEstimatesData()
    }
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
          this.router.navigateByUrl(`/create-estimation/${rowData.id}`);
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
