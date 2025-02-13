import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IndustryType } from '../models/industry-type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IndustryTypeService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  rootController = `${environment.baseUrl}/api/IndustryType`;
  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  getIndustryTypes() {
    return this.http.get<any[]>(`${this.rootController}/list`,{ headers: this.header });
  }

  AddIndustryType(license: any) {
    return this.http.post(`${this.rootController}/AddIndustryType`, license, { headers: this.header });
  }

  UpdateIndustryType(license: any) {
    return this.http.post(`${this.rootController}/updateIndustryType`, license, { headers: this.header });
  }

  deleteIndustryType(id: any) {
    return this.http.delete(`${this.rootController}/${id}`, { headers: this.header });
  }
}
