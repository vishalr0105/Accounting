import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { bankAccount } from '../models/bankAccount.model';
import { Company } from '../models/company';
import { License } from '../models/license';
// import { companyData } from '../modules/dispatcher-boards/data';
import { AuthService } from './auth.service';
import { Guid } from '@syncfusion/ej2/pdf-export';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  private geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  private timezoneUrl = 'https://maps.googleapis.com/maps/api/timezone/json';
  private apiKey = 'AIzaSyA7cUKxYBQIS07vLw8aniZJIUUwYSGAGik'; // Replace with your Google API key
  rootController = `${environment.baseUrl}/api/Company`;

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  addCompany(company: Company) {
    return this.http.post<string>(`${this.rootController}/AddCompany`, company, { headers: this.header });
  }

  getCompany() {
    return this.http.get<Company>(`${this.rootController}`, { headers: this.header });
  }

  updateCompany(company: Company) {
    return this.http.patch<Company>(`${this.rootController}`, company, { headers: this.header });
  }
  addBankAccount(bankAccount: bankAccount):Observable<any> {
   return this.http.post<bankAccount>(`${this.rootController}/AddBankAccount`, bankAccount, { headers: this.header });
  }
  updateBankAccount(bankAccount: bankAccount):Observable<any> {
    return this.http.put<bankAccount>(`${this.rootController}/EditBankAccount/${bankAccount.id}`, bankAccount, { headers: this.header });
   }
   deleteBankAccount(id:Guid)
   {
    return this.http.delete<any>(`${this.rootController}/DeleteBankAccount/${id}`, { headers: this.header });
   }
  addLicense(license:License):Observable<any> {
   return this.http.post<License>(`${this.rootController}/AddLicense`, license, { headers: this.header });
  }
  updateLicenseData(license: License):Observable<any> {
    return this.http.put<License>(`${this.rootController}/EditLicense/${license.id}`, license, { headers: this.header });
   }
   deleteLicenseData(id:Guid)
   {
    
    return this.http.delete<any>(`${this.rootController}/DeleteLicense/${id}`, { headers: this.header });
   }
  GetNotificationSetting(companyid: string): Observable<any> {

    return this.http.get<License>(`${this.rootController}/GetNotificationSetting?companyid=${companyid}`,{ headers: this.header });
  }
  UpdateNotificationSetting(setting:any) {
    return this.http.post(`${this.rootController}/UpdateNotificationSetting`, setting, {
      headers: this.header
    });
  }
  GetNotifications():Observable<any> {
    return this.http.post(`${this.rootController}/GetNotifications`, {
      headers: this.header
    });
  }

  get_allcompany():Observable<any> {
    return this.http.get(`${this.rootController}/get_allcompany`, {
      headers: this.header
    });
  }


  getCoordinates(address: string): Observable<any> {
    const params = new HttpParams().set('address', address).set('key', this.apiKey);
    return this.http.get(this.geocodeUrl, { params });
  }

  getTimeZone(lat: number, lng: number, timestamp: number): Observable<any> {
    const params = new HttpParams()
      .set('location', `${lat},${lng}`)
      .set('timestamp', timestamp.toString())
      .set('key', this.apiKey);
    return this.http.get(this.timezoneUrl, { params });
  }
  getpaymentSetting():Observable<any>{
    return this.http.get(`${this.rootController}/GetPaymentSettingByCompany`, {
      headers: this.header
    })    
  }
}
