import { Component, OnInit } from '@angular/core';
import { _UnicodeLine } from '@syncfusion/ej2/pdf';
import { settings } from 'cluster';
import { Observable } from 'rxjs';
import { AlertService } from '../../../services/alert.service';
import { CompanyService } from '../../../services/company.service';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  headerText = ["Notifications", "Settings"];
  curUser: any;
  notificationSetting: any;
  NotificationsList:any;
  constructor(
    private route:Router,
    private companyservice: CompanyService,private alertservice:AlertService,public dashBoard:DashboardService) {

  }

  ngOnInit(): void {
    this.AllNotification();

    this.curUser = JSON.parse(sessionStorage.getItem('current_user'));
    
    this.companyservice.GetNotificationSetting(this.curUser.companyId).subscribe(res => {
      this.notificationSetting = res;
      this.notificationSetting.forEach(x => {
        var y = x.notificationTypes.find(y => y.subscribed == false);
        if (!y) {
          x.subscribed = true;
        }
      })
    });
  }
  AllNotification()
  {
    this.dashBoard.getNotificationList(false).subscribe(res=>{
      this.NotificationsList=res;
      this.dashBoard.NotificationList=[];


    })
  }
 
  enableDisableByCategory(s: any) {
    s.subscribed = !s.subscribed;
    var cat = this.notificationSetting.find(x => x.notificationCategoryId == s.notificationCategoryId).notificationTypes;
    cat.map(x => x.subscribed = s.subscribed);
  }
  enableDisableCategoryByType(t: any) {
    
    t.subscribed = !t.subscribed;
    var cat = this.notificationSetting.find(x => x.notificationCategoryId == t.n_CatId).notificationTypes;
      var catgroup = this.notificationSetting.find(x => x.notificationCategoryId == t.n_CatId);
    var check_Unsubscribed = cat.find(x => x.subscribed == false);
    if (check_Unsubscribed == undefined) {
      catgroup.subscribed = true;
    } else {
      catgroup.subscribed= false;
    }
  }
  updateChanges() {
    var setting = [];
    this.notificationSetting?.forEach((x: any) => {
      
      x.notificationTypes.forEach((y: any) => {
        setting.push({ Subscribed: y.subscribed, n_TypeId: y.n_TypeId });
      })
    });
    this.companyservice.UpdateNotificationSetting(setting).subscribe(res => {
      this.alertservice.showToasterWithTitle(
        'Success',
        `Setting Updated`,
        'success'
      );
    }, catchError => {
      this.alertservice.showToasterWithTitle(
        'Error',
        `Setting Updated`,
        'error'
      );
    });
  }

}
