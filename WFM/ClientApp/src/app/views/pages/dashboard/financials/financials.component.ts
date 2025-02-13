import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartComponent, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { ProgressbarService } from 'src/app/views/services/progressbar.service';

@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.scss']
})
export class FinancialsComponent implements OnInit {
  allData: any
  totalRevenue: any
  salesRevenueData:any;
  invoicesGraphData:any;
  netIncomeGraphData:any;
  ProfitabilityGraphData:any;
  CustomerChurnGraphData:any;
  operatingExpenseGraphData:any;

  cashrunwayGraphData:any;
  paymentReceivedGraphData:any;
  timelineddl:FormControl=new FormControl();
  @ViewChild('salesRevenueGraph')salesRevenueGraph:ChartComponent

  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public tooltip: Object = {
    enable: true,

    header: ''
  };
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top',

      font: {
        fontWeight: '600', color: 'black'
      }
    }
  }

  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',

    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}',

    edgeLabelPlacement: 'Shift',
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
  };

  public legend: Object = {
    visible: true,
    enableHighlight: true
  }
  constructor(private dashboardService: DashboardService,private pgbservice:ProgressbarService) { }

  ngOnInit(): void {
    this.pgbservice.showprogress=true;
    this.timelineddl.setValue(4);
  }
}
