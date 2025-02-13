import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
  // rootController = `${environment.baseUrl}/api/WorkOrder`;
  rootController = `${environment.baseUrl}`;
  ///api/Archive/order
  technicianController = `${environment.baseUrl}/api/TechnicianAssignment`;
  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  });

  constructor(private authService: AuthService, private http: HttpClient) {}

  getTimeZone(lat: number, lng: number, timestamp: number): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${environment.googleMapsApiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => response)
    );
  }
}
