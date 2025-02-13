import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import SchdeulingPrefrences from '../models/scheduling-prefrences';

@Injectable({
  providedIn: 'root'
})
export class SchedulingPreferencesService {
  rootController = `${environment.baseUrl}/api/SchedulingPrefrences`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  addNew(schdeulingPrefrences: any) {
    return this.http.post<any>(`${this.rootController}/AddNew`, schdeulingPrefrences, { 'headers': this.header });
  }

  getAll() {

    return this.http.get(`${this.rootController}/GetAllScheduling`, { 'headers': this.header })
  }

}
