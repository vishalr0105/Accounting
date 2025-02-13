import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeedassistanceService {
  rootController = `${environment.baseUrl}/api/NeedAssistance`;
  constructor(private http: HttpClient,private authService: AuthService) { }
  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  });
 
  sendEmail(requestData: any): Observable<any> {
    debugger
    return this.http.post(`${this.rootController}/send-email-to-support-team`, requestData, {
      headers: this.header,
    });
  }

}
