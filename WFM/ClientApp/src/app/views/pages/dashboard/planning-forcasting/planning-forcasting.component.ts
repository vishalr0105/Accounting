import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartAnnotationSettingsModel, ChartTheme, ILoadedEventArgs, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2/base';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { ProgressbarService } from 'src/app/views/services/progressbar.service';

@Component({
  selector: 'app-planning-forcasting',
  templateUrl: './planning-forcasting.component.html',
  styleUrls: ['./planning-forcasting.component.scss']
})
export class PlanningForcastingComponent implements OnInit {
  allData:any;
  targetAchive:any;
  TargetVsRevenueGraphData:any;
  WorkorderForcastGraphData:any;
  TgVsRevDDL:FormControl=new FormControl();
  workorderForcastDDL:FormControl=new FormControl();
  public colors: string[] = ['red', 'green', '#ff0097', 'crimson', 'blue', 'darkorange', 'deepskyblue',
  'mediumvioletred', 'violet', 'peru', 'gray', 'deeppink', 'navy'];
  public dataValues: Object[] = [];
   dataList:any;
  public annotations: ChartAnnotationSettingsModel[] = [
    {
        x: 'Sun',
        y: 2,
        coordinateUnits: 'Point',
        verticalAlignment: 'Top',
        content: '<div id="chart_cloud"><img src="./assets/chart/images/cloud.png" style="width: 41px; height: 41px"/></div>'
    },{
        x: 'Tue',
        y: 33,
        coordinateUnits: 'Point',
        verticalAlignment: 'Top',
        content: '<div id="chart_cloud"><img src="./assets/chart/images/sunny.png" style="width: 41px; height: 41px"/></div>'
    },
];

  public data1: Object[] = [
    { x: 'Sun', y: 10 }, { x: 'Mon', y: 18 },
    { x: 'Tue', y: 28 },
    { x: 'Wed', y: 28 },
    { x: 'Thu', y: 26 }, { x: 'Fri', y: 20 },
    { x: 'Sat', y: 15 }
];
public data2: Object[] = [
    { x: 'Sun', y: 2 }, { x: 'Mon', y: 12 },
    { x: 'Tue', y: 22 },
    { x: 'Wed', y: 23 },
    { x: 'Thu', y: 19 }, { x: 'Fri', y: 13 },
    { x: 'Sat', y: 8 },
];
public data3: Object[] = [
  { x: 'Sun', y: 7 }, { x: 'Mon', y: 12 },
  { x: 'Tue', y: 29 },
  { x: 'Wed', y: 26 },
  { x: 'Thu', y: 21 }, { x: 'Fri', y: 13 },
  { x: 'Sat', y: 12 },
];
public data4: Object[] = [
  { x: 'Sun', y: 23 }, { x: 'Mon', y: 12 },
  { x: 'Tue', y: 34 },
  { x: 'Wed', y: 30 },
  { x: 'Thu', y: 27 }, { x: 'Fri', y: 13 },
  { x: 'Sat', y: 23 },
];

  public data: Object[] = [
    {
      Year: '2012',
      USA_Total: 10,
      USA_Gold: 46,
      UK_Total: 65,
      UK_Gold: 29,
      China_Total: 91,
      China_Gold: 38,
    },
    {
      Year: '2016',
      USA_Total: 121,
      USA_Gold: 46,
      UK_Total: 67,
      UK_Gold: 27,
      China_Total: 70,
      China_Gold: 26,
    },
    {
      Year: '2020',
      USA_Total: 113,
      USA_Gold: 39,
      UK_Total: 65,
      UK_Gold: 22,
      China_Total: 88,
      China_Gold: 38,
    },
  ];

  public chartArea: Object = {
    border: {
      width: 0,
    },
  };


  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}',
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
  };
  public tooltip: Object = {
    enable: true,
  };
  //Initializing Marker
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top',
      font: {
        fontWeight: '600',
        color: 'black',
      },
    },
  };
  public legend: Object = {
    visible: true,
  };


  constructor(private dashboardService: DashboardService,
    private pgbservice:ProgressbarService) { }

  ngOnInit(): void {
    this.pgbservice.showprogress=true;
  }

  public pointRender(args: IPointRenderEventArgs): void {
    let pointMaterialColors: string[] = ["#B7C4FF", "#404041", "#357cd2", "#e56590", "#f8b883", "#70ad47", "#dd8abd", "#7f84e8", "#7bb4eb",
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
