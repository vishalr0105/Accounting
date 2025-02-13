import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  rootController = `${environment.baseUrl}/api/Country`;

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  getAllCountry() {
    return this.http.get<any[]>(`${this.rootController}/GetCountryList`, { headers: this.header });
  }
  getStates(id: string) {
    return this.http.get<any>(`${this.rootController}/GetStateList/${id}`, { headers: this.header });
  }
  getCities(id: string) {
    return this.http.get<any>(`${this.rootController}/GetCityList/${id}`, { headers: this.header });
  }

  getCountry(id:string) {
    return this.http.get<any[]>(`${this.rootController}/GetCountry/${id}`, { headers: this.header });
  }
  getStatesById(id: string) {
    return this.http.get<any>(`${this.rootController}/GetState/${id}`, { headers: this.header });
  }

  getCitiesById(id: string) {
    return this.http.get<any>(`${this.rootController}/GetCity/${id}`, { headers: this.header });
  }

  getZipCodes(id: string) {
    return this.http.get<any>(`${this.rootController}/GetZipCodeList/${id}`, { headers: this.header });
  }

  getIP() {
    return this.http.get<any>('https://api.ipify.org?format=json');
  }

  getCountryNameFromIP(ip: string) {
    return this.http.get<string>(`https://ipapi.co/${ip}/json`);
  }
}
