import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Dashboard, DashboardReport } from '../models/dashboard';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  rootController = `${environment.baseUrl}/api/Dashboard`;
  root = `${environment.baseUrl}`;
  NotificationList=[];
  constructor(private http: HttpClient, private authService: AuthService,private route:Router) {}

  // header = new HttpHeaders({
  //   Authorization: 'Bearer ' + this.authService.accessToken,
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json, text/plain, */*',
  // });

  header = new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  });


  getDashboards(isActive: boolean = true) {
    return this.http.get<Dashboard[]>(
      `${this.rootController}/list?isActive=${isActive}`,
      { headers: this.header }
    );
  }

  getDashboardsByRoleId(roleId: string, isActive: boolean = true) {
    return this.http.get<Dashboard[]>(
      `${this.rootController}/list/${roleId}?isActive=${isActive}`,
      { headers: this.header }
    );
  }

  getDashboardsByUserRoles(userId: string, isActive: boolean = true) {
    return this.http.get<Dashboard[]>(
      `${this.rootController}/listbyuserroles/${userId}?isActive=${isActive}`,
      { headers: this.header }
    );
  }

  addDashboardsByRoleId(roleId: string, dashboards: Dashboard[]) {
    return this.http.post(`${this.rootController}/add/${roleId}`, dashboards, {
      headers: this.header,
    });
  }
  getDashboardsReport(): Observable<DashboardReport> {
    return this.http.get<DashboardReport>(
      `${this.rootController}/BackOfficeDashboard`,
      { headers: this.header }
    );
  }

  getDashboardListById(filterObj:any){
    return this.http.post(`${this.rootController}/GetDashboardListById?id=`,filterObj, {
      headers: this.header,
    });
  }
  CalculatePriorTime(param:any){
    return this.http.get(`${this.rootController}/CalculatePriorTime?timePeriod=${param}`, {
      headers: this.header,
    });
  }

  getNotificationList(isNew:any){
    return this.http.get<any>(
      `${this.rootController}/GetNotificationList?isNew=${isNew}`,
      { headers: this.header }
    );
  }
  getMyAnalyticsData(){
    return this.http.get<any>(
      `${this.rootController}/GetMyAnalyticsData`,{ headers: this.header }
    );
  }

  gotoListing(n){

    switch(n.notificationTypeId){
      case 1:
        this.route.navigateByUrl('/admin/appointments');break;
      case 11:
        this.route.navigateByUrl('/admin/estimate-n-quotes');break;
    }
  }
  clearNotifications():Observable<any>{
    return this.http.get<any>(
      `${this.rootController}/MarkAsReadNotification`,{ headers: this.header }
    );
  }




















}
