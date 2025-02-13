import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from 'src/app/views/services/team-member.service';

@Component({
  selector: 'app-dashboarduser',
  templateUrl: './dashboarduser.component.html',
  styleUrls: ['./dashboarduser.component.scss']
})
export class DashboarduserComponent implements OnInit {
  currentTime: Date = new Date();
  salutation: string = '';
  activeTabIndex: number = 0;
  currentuser:any;

  // pie chart
  public pieData = [
    { x: 'Total Purchased', y: 40 },
    { x: 'Total Spent', y: 30 },
    { x: 'Total Available', y: 30 }
  ];

  public legendSettings = {
    visible: true
  };

  public dataLabel = {
    visible: true,
    position: 'Outside'
  };

  // column chart
  public chartData = [
    { x: 'Jan', y: 35 },
    { x: 'Feb', y: 28 },
    { x: 'Mar', y: 34 },
    { x: 'Apr', y: 32 },
    { x: 'May', y: 40 }
  ];

  public primaryXAxis = {
    valueType: 'Category'
  };

  public primaryYAxis = {
    labelFormat: '{value}'
  };


  constructor(private _teamMemberService: TeamMemberService) { }

  ngOnInit(): void {
    this._teamMemberService.getPieChart().subscribe(res=>{
      console.log(res,'res====pie chart');
      this.pieData=res
    })
    this._teamMemberService.getColumnChart().subscribe(res=>{
      console.log(res,'res====pie chart');
      this.chartData=res
    })
    this.setSalutation()
  }

  setSalutation() {
    const currentHour = this.currentTime.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      this.salutation = 'Good Morning ';
    } else if (currentHour >= 12 && currentHour < 16) {
      this.salutation = 'Good Afternoon ';
    } else {
      this.salutation = 'Good Evening ';
    }
  }
}
