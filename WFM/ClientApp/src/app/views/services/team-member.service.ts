import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';
import { TeamMember } from '../models/teamMember';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  rootController = `${environment.baseUrl}/api/Account`;
  rootControllers = `${environment.baseUrl}/api/TeamMember`;
  techControllers = `${environment.baseUrl}/api/Technician`;
  pieChart = `${environment.baseUrl}/api/Archive/getpiedata`;
  columnChart = `${environment.baseUrl}/api/Archive/getchartdata`;
  teammembers:any;
  constructor(private http: HttpClient, private authService: AuthService) { }

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  });

  getAllRoles() {
    return this.http.get<Role[]>(`${this.rootController}/roles`, { headers: this.header });
  }

  getIndividualLicenseCerts() {
    return this.http.get<any>(`${this.rootControllers}/GetIndividualLicenseCerts`, { headers: this.header });
  }


  getTeamMembersById(id: string) {
    return this.http.get<any>(`${this.rootControllers}/getTeamMemberById/${id}`, { headers: this.header });
  }

  getDepartments() {
    return this.http.get<any>(`${this.rootControllers}/GetDepartments`, { headers: this.header });
  }

  getALLTeamMember() {
    return this.http.get<TeamMember[]>(`${this.rootControllers}/getAllTeamMember`, { headers: this.header });
  }

  getPieChart(){
    return this.http.get<any>(this.pieChart, { headers: this.header })
  }

  getColumnChart(){
    return this.http.get<any>(this.columnChart, { headers: this.header })
  }
}
