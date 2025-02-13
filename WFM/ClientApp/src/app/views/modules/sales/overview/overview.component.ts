import { Component, OnInit } from '@angular/core';
import { stackedData ,variespiedata} from './datasource';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public primaryXAxis?: Object;
  public chartData?: Object[];
  public title?: string;
  primaryYAxis: any;

  // pie chart
  public pieData?: Object[];
  public startAngle?: number;
  public endAngle?: number;
  public center?: Object ;
  public explode?: boolean ;
  public enableAnimation?: boolean ;
  // public title?: string ;
  public radius?: string ;
  public legendSettings?: Object;

  ngOnInit(): void {
      this.chartData = stackedData;
      this.primaryXAxis = {
          valueType: 'Category',
          title: 'Months'
      };
      this.title = 'Sales Comparison';

      this.pieData = variespiedata;
        this.legendSettings = {
            visible: false
        };
    this.startAngle = 0;
    this.endAngle = 360;
    this.enableAnimation = true;
    this.title = 'Mobile Browser Statistics';
  }

}
