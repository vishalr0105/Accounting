
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';
import { profileModel } from '../models/profileModel';

import { changepassword } from '../models/passwordchange';
import { saveCheckboxValue } from '../models/saveCheckboxValue';

@Injectable({
  providedIn: 'root'
})



export class profileservece {

  rootController = `${environment.baseUrl}/api/Account`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  Profileupdate(profileeditmodelform: any) {
    return this.http.post<profileModel>(`${this.rootController}/Profileupdate`, profileeditmodelform, { headers: this.header });
  }

  getCompany() {
    return this.http.get<Company>(`${this.rootController}`, { headers: this.header });
  }

  Getprofile() {
    return this.http.get<profileModel>(`${this.rootController}/Getprofile`, { headers: this.header });
  }
  SaveProfilecheck(checkboxValue: any): Observable<any> {
    return this.http.post<saveCheckboxValue>(`${this.rootController}/SaveProfilecheck`, checkboxValue, { headers: this.header });
  }
  newsavepassword(changepassword: any) {
    return this.http.post<changepassword>(`${this.rootController}/newsavepasswords`, changepassword, { headers: this.header });
  }
  updateAccountSecurity(data:any){
    return this.http.post<changepassword>(`${this.rootController}/UpdateAccountSecurity`, data, { headers: this.header });
  }
}