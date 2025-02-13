import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { ProgressbarService } from 'src/app/views/services/progressbar.service';

@Component({
  selector: 'app-business-performance',
  templateUrl: './business-performance.component.html',
  styleUrls: ['./business-performance.component.scss']
})
export class BusinessPerformanceComponent implements OnInit {
  dataList: any;
  quote_Conversation_duration=4;
  quoteConversationGraph_Data:any;
  jobserviceprofitabilityGraph_Data:any;
  @ViewChild('Quote_Conversation_graph')Quote_Conversation_graph:ChartComponent;
  @ViewChild('jobserviceprofitabilityGraph')jobserviceprofitabilityGraph:ChartComponent;
  public revienuData: Object[]

  public primaryXAxis1: Object = {
    valueType: 'Accounts',

  };
  //Initializing Primary Y Axis
  public primaryYAxis1: Object = {
    labelFormat: '{value}%',
  };
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top', font: {
        fontWeight: '600',
        color: 'black'
      }
    }
  }

  public primaryXAxis: Object = {
    valueType: 'Category',

    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}%',

  };
  //Initializing Tooltip
  public tooltip: Object = {
    enable: true, format: '${point.tooltip}'
  };
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public jobServiceProvitabilityXAxis:object={
    valuType:'category',
    title:'Timeline'
  }
  public jobServiceProvitabilityYAxis:object={
    valuType:'value',
    title:'Profit'
  }

  public dataLabel: Object = {
    visible: true,
    position: 'Inside', enableRotation: true, connectorStyle: { type: 'Curve', length: '10%' }, font: { color: 'white', fontWeight: '600' }
  };

  constructor(private dashboardService: DashboardService,private pgbservice:ProgressbarService) { }
  ngOnInit(): void {
    this.pgbservice.showprogress=true;
  }
  public pointRender(args: IPointRenderEventArgs): void {
    let pointMaterialColors: string[] = ["#00bdae", "#404041", "#357cd2", "#e56590", "#f8b883", "#70ad47", "#dd8abd", "#7f84e8", "#7bb4eb",
      "#ea7a57", "#404041", "#00bdae"];
    let pointBootstrapColors: string[] = ["#0d6efd", "#6610f2", "#d63384", "#fd7e14", "#198754", "#dc3545", "#20c997"];
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';

    if (selectedTheme === 'material') {
      args.fill = pointMaterialColors[args.point.index % 10];
    }

    else {
      args.fill = pointBootstrapColors[args.point.index % 10];
    }
  };
}
