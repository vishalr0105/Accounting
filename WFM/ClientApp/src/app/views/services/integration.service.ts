import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { access } from 'fs';
import { environment } from '../../../environments/environment';
import { Integration } from '../models/Integration.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  rootControllers = `${environment.baseUrl}/api/Quickbooks`;
  intergrationController=`${environment.baseUrl}/api/integration`;
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  });
  getSyncSetting(companyid:string) {
    return this.http.get<Integration>(`${this.rootControllers}/GetIntegrationSetting?companyid=${companyid}`, { headers: this.header });
  }

  saveSyncSetting(integration: any) {
    return this.http.post(`${this.rootControllers}/SaveIntegrationSetting`, integration, { headers: this.header });
  }
  loginToQb() {
    return this.http.post(`${this.rootControllers}/Login`, { name: 'a','accountType':'b'}, { headers: this.header });
  }
  GetQbAccessToken(qbcode:string) {
    return this.http.get(`${this.rootControllers}/GetQbAccessToken?qbcode=${qbcode}`, { headers: this.header });
  }
  GetUserInfo() {
    var accessToken = JSON.parse(localStorage.getItem('QbAccessToken'));
    console.log(accessToken);
    return this.http.get(`${this.rootControllers}/GetUserInfo?accessToken=${accessToken}`, { headers: this.header });
  }
  SavePaymentSetting(data):Observable<any>{
   return this.http.post(`${this.intergrationController}/SavePaymentSetting`,data, { headers: this.header });
  }
  
}
