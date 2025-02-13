import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { WorkOrderService } from 'src/app/views/services/work-order.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

declare var bootstrap: any;
@Component({
  selector: 'app-service-performance',
  templateUrl: './service-performance.component.html',
  styleUrls: ['./service-performance.component.scss']
})
export class ServicePerformanceComponent implements OnInit {
  public orders: any = [];
  public tenants: any = [];
  public users: any = [];

  isWorkspaceSelected = true;
  public toolbarOptions: string[];
  constructor(private dashaboard: DashboardService, private workOrderService: WorkOrderService) { }

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

  copiedId: any;

  copyId(data: { id: string }): void {
    navigator.clipboard.writeText(data.id).then(
      () => {
        this.copiedId = data.id;
      },
      (err) => {
        console.error('Failed to copy ID: ', err);
      }
    );
  }
}
