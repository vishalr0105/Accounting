import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DashboardService } from 'src/app/views/services/dashboard.service';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.scss']
})

export class DispatcherComponent implements OnInit {
  public orders:any = [];
  totalOrders:any=0

  public tenants:any = [];
  public users:any = [];

  isWorkspaceSelected = true;
  public toolbarOptions: string[]
  constructor(private dashboard:DashboardService){}

  toggleSwitch() {
    this.isWorkspaceSelected = !this.isWorkspaceSelected;
  }

  public filteredOrders = this.orders;
  public searchTerm: any = '';
  public pageSettings: PageSettingsModel = { pageSize: 5 };

  filterOrders() {
    this.filteredOrders = this.orders.filter((order) =>
      order.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  ngOnInit(): void {
    this.toolbarOptions = ['Search'];
  }
  onActionBegin(event: any) {
    if (event.requestType === 'paging') {
      console.log('Page Changed: ', event);
    }
  }
}
