import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = environment.baseUrl;
  private readonly baseEndpoint = 'api/Customer';

  constructor(
    private globalService: GlobalApiService,
    private http: HttpClient
  ) {}

  uploadExcelFile(importData: FormData): Observable<any> {
    const endpoint = `${this.baseEndpoint}/excelimport`;
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, importData);
  }
}
