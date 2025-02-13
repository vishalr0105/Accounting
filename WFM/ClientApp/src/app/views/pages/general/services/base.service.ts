import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/views/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected rootController = `${environment.baseUrl}/api`;

  constructor(protected http: HttpClient, protected authService: AuthService) {}

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    });
  }

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.rootController}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  protected post<T>(endpoint: string, payload: any): Observable<T> {
    return this.http.post<T>(`${this.rootController}/${endpoint}`, payload, {
      headers: this.getHeaders(),
    });
  }

  protected put<T>(endpoint: string, payload: any): Observable<T> {
    return this.http.put<T>(`${this.rootController}/${endpoint}`, payload, {
      headers: this.getHeaders(),
    });
  }

  protected patch<T>(endpoint: string, payload: any): Observable<T> {
    return this.http.patch<T>(`${this.rootController}/${endpoint}`, payload, {
      headers: this.getHeaders(),
    });
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.rootController}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }
}
