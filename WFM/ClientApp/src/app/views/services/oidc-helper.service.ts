// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

import { LocalStoreManager } from './local-store-manager.service';
import { ConfigurationService } from './configuration.service';
import { DBkeys } from './db-keys';
import { LoginResponse } from '../models/login-response.model';
import { environment } from 'src/environments/environment';
import { Feature } from '../modules/roleandpermission/role';
import { email } from 'ngx-custom-validators/src/app/email/validator';

@Injectable()
export class OidcHelperService {
  private get baseUrl() {
    return this.configurations.baseUrl;
  }
  private clientId = 'quickapp_spa';
  private scope =
    'openid email phone profile offline_access roles quickapp_api';

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
    private configurations: ConfigurationService,
    private localStorage: LocalStoreManager
  ) { }

  loginWithPassword(userName: string, password: string,otp:string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    });
    const params = new HttpParams()
      .append('username', userName)
      .append('password', password)
      .append('client_id', this.clientId)
      .append('grant_type', 'password')
      .append('scope', this.scope);

    this.oauthService.issuer = this.baseUrl;
    //this.oauthService.responseType = 'code';
    this.oauthService.strictDiscoveryDocumentValidation = false;
    this.oauthService.requireHttps = false;

    return from(this.oauthService.loadDiscoveryDocument()).pipe(
      mergeMap(() => {
        return this.http.post<LoginResponse>(
          this.oauthService.tokenEndpoint,
          params,
          { headers: header }
        );
      })
    );
  }

  loginWithPasswordNew(userName: string, password: string, Otp:string,isSocial: boolean,) {
    return this.http.post<LoginResponse>(
      `${environment.baseUrl}/api/Account/login`,
      { userName, password, isSocial,Otp }
    );
  }
  getLoginOtp(userName: string, password: string, Otp:string,isSocial: boolean,) {
      return this.http.post<LoginResponse>(
        `${environment.baseUrl}/api/Account/GetLoginOtp`,
        { userName, password, isSocial,Otp }
      );
  }
  getUpdateProfileOtp(userName: string) {
    return this.http.post<LoginResponse>(
      `${environment.baseUrl}/api/Account/GetProfileChangeOtp`,
       {'userName':userName,'password':'','isSocial':false,'otp':''}
    );
}




  getFeature(user)
  {
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    });

     return this.http.post<Feature[]>(`${environment.baseUrl}/api/Account/GetFeature`, {
      headers: header,
      params:user
    });
  }
  logout() {
    const header = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    });

    return this.http.get<any>(`${environment.baseUrl}/api/Account/logout`, {
      headers: header,
    });
  }

  refreshLogin() {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const params = new HttpParams()
      .append('refresh_token', this.refreshToken)
      .append('client_id', this.clientId)
      .append('grant_type', 'refresh_token');

    this.oauthService.issuer = this.baseUrl;
    //this.oauthService.responseType = 'code';
    //this.oauthService.strictDiscoveryDocumentValidation = false;
    //this.oauthService.requireHttps = false;
    return from(this.oauthService.loadDiscoveryDocument()).pipe(
      mergeMap(() => {
        return this.http.post<LoginResponse>(
          this.oauthService.tokenEndpoint,
          params,
          { headers: header }
        );
      })
    );
  }

  get accessToken(): string {
    return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
  }

  get accessTokenExpiryDate(): Date {
    return this.localStorage.getDataObject<Date>(DBkeys.TOKEN_EXPIRES_IN, true);
  }

  get refreshToken(): string {
    return this.localStorage.getData(DBkeys.REFRESH_TOKEN);
  }

  get isSessionExpired(): boolean {
    if (this.accessTokenExpiryDate == null) {
      return true;
    }

    return this.accessTokenExpiryDate.valueOf() <= new Date().valueOf();
  }

  userLogin(email:string,password:string):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/Account/loginuser`,{
      email,
      password
    })
  }
}
