// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class SiteEndpoint extends EndpointBase {

  get siteUrl() { return this.configurations.baseUrl + '/api/site'; }
  get userByUserNameUrl() { return this.configurations.baseUrl + '/api/account/users/username'; }
  get currentUserUrl() { return this.configurations.baseUrl + '/api/account/users/me'; }
  get currentUserPreferencesUrl() { return this.configurations.baseUrl + '/api/account/users/me/preferences'; }
  get unblockUserUrl() { return this.configurations.baseUrl + '/api/account/users/unblock'; }
  get rolesUrl() { return this.configurations.baseUrl + '/api/account/roles'; }
  get roleByRoleNameUrl() { return this.configurations.baseUrl + '/api/account/roles/name'; }
  get permissionsUrl() { return this.configurations.baseUrl + '/api/account/permissions'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getSites<T>(): Observable<T> {
    return this.http.get<T>(this.siteUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => null);
      }));
  }

  addSite<T>(userObject: any): Observable<T> {
    return this.http.post<T>(this.siteUrl, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => null);
      }));
  }

  updateSite<T>(userObject: any): Observable<T> {
    return this.http.put<T>(this.siteUrl+'/'+userObject.id, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => null);
      }));
  }

  deleteSite<T>(id: any): Observable<T> {
    return this.http.delete<T>(this.siteUrl+'/'+id, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => null);
      }));
  }
}
