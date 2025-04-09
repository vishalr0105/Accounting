import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalApiService {
    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        endpoint: string,
        body?: any,
        params?: any,
        // headers?: any
    ):Observable<T>{

        // set headers
        // const httpHeaters = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        //     'Content-Type': 'application/json',
        //     ...headers
        // });

        return this.http.request<T>(method, `${this.baseUrl}/${endpoint}`, {
            body,
            params:new HttpParams({ fromObject: params }),
            // headers: httpHeaters
        })
    }
}
