// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LocalStoreManager } from './local-store-manager.service';
import { OidcHelperService } from './oidc-helper.service';
import { ConfigurationService } from './configuration.service';
import { DBkeys } from './db-keys';
import { JwtHelper } from './jwt-helper';
import { Utilities } from './utilities';
import { AccessToken, LoginResponse } from '../models/login-response.model';
import { User } from '../models/user.model';
import { PermissionValues } from '../models/permission.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable()
export class AuthService {
  private userSubject = new BehaviorSubject('');
  public users?:any;
  public get loginUrl() {
    return this.configurations.loginUrl;
  }
  public get homeUrl() {
    return this.configurations.homeUrl;
  }

  public loginRedirectUrl: string;
  public logoutRedirectUrl: string;
  public permissions: any[];

  public reLoginDelegate: () => void;
  public currentUserRole: any
  private previousIsLoggedInCheck = false;
  private loginStatus = new Subject<boolean>();

  constructor(
    private router: Router,
    private oidcHelperService: OidcHelperService,
    private configurations: ConfigurationService,
    private localStorage1: LocalStoreManager,
    private http: HttpClient,
    private alertService: AlertService,

  ) {
    this.initializeLoginStatus();
    //this.currentUserRole = localStorage.getItem('role_name')
    this.currentUserRole = sessionStorage.getItem('current_user')
    this.currentUserRole = JSON.parse(this.currentUserRole)
    let token: any = localStorage.getItem('access_token')
    let username: any = localStorage.getItem('user')
    this.userSubject.next(JSON.parse(token))
    this.users = JSON.parse(username)
    this.currentUserRole = localStorage.getItem('role_name')
    this.currentUserRole = JSON.parse(this.currentUserRole)
  }

  private initializeLoginStatus() {
    this.localStorage1.getInitEvent().subscribe(() => {
      this.reevaluateLoginStatus();
    });
  }
  hasRole(requiredRole: string): boolean {

    const userRoles: string[] = ['Admin', 'Technician','Customer']; // Replace with actual user roles
    if(requiredRole=='Admin')
    {
      this.currentUserRole = sessionStorage.getItem('current_user')
      this.currentUserRole = JSON.parse(this.currentUserRole)
      return userRoles.includes(requiredRole[0]) && requiredRole[0] == this.currentUserRole?.userType;
    }
    else if(requiredRole=='Technician')
    {
      this.currentUserRole = sessionStorage.getItem('current_user')
      this.currentUserRole = JSON.parse(this.currentUserRole)
      return userRoles.includes(requiredRole[0]) && requiredRole[0] == this.currentUserRole?.userType;
    }
    else if (requiredRole == 'Customer') {
      this.currentUserRole = sessionStorage.getItem('current_user')
      this.currentUserRole = JSON.parse(this.currentUserRole)
      return userRoles.includes(requiredRole[0]) && requiredRole[0] == this.currentUserRole?.userType;
    }

  }
  gotoPage(page: string, preserveParams = true) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: preserveParams ? 'merge' : '',
      preserveFragment: preserveParams,
    };

    this.router.navigate([page], navigationExtras);
  }

  gotoHomePage() {
    this.router.navigate([this.homeUrl]);
  }
   getFeatureAccess(featureCode: string) {
    const loginUser = this.localStorage1.getDataObject<User>(DBkeys.CURRENT_USER);
    this.reevaluateLoginStatus(loginUser);
    if (loginUser) {
      const data = JSON.parse(loginUser.features)
      return data.includes(featureCode);
    }

    else
      return false;
  }
  redirectLoginUser() {
    const redirect =
      this.loginRedirectUrl &&
      this.loginRedirectUrl !== '/' &&
      this.loginRedirectUrl !== ConfigurationService.defaultHomeUrl
        ? this.loginRedirectUrl
        : this.homeUrl;
    this.loginRedirectUrl = null;
    const urlParamsAndFragment = Utilities.splitInTwo(redirect, '#');
    const urlAndParams = Utilities.splitInTwo(
      urlParamsAndFragment.firstPart,
      '?'
    );

    const navigationExtras: NavigationExtras = {
      fragment: urlParamsAndFragment.secondPart,
      queryParams: Utilities.getQueryParamsFromString(urlAndParams.secondPart),
      queryParamsHandling: 'merge',
    };

    this.router.navigate([urlAndParams.firstPart], navigationExtras);
  }

  redirectLogoutUser() {
    const redirect = this.logoutRedirectUrl
      ? this.logoutRedirectUrl
      : this.loginUrl;
    this.logoutRedirectUrl = null;

    this.router.navigate([redirect]);
  }

  redirectForLogin() {
    this.loginRedirectUrl = this.router.url;
    this.router.navigate([this.loginUrl]);
  }

  reLogin() {
    if (this.reLoginDelegate) {
      this.reLoginDelegate();
    } else {
      this.redirectForLogin();
    }
  }

  refreshLogin() {
    return this.oidcHelperService
      .refreshLogin()
      .pipe(map((resp) => this.processLoginResponse(resp, this.rememberMe)));
  }

  loginWithPassword(userName: string, password: string, issocial:boolean,otp:string, rememberMe?: boolean) {
    if (this.isLoggedIn) {
      this.logout();
    }

    return this.oidcHelperService
      .loginWithPasswordNew(userName, password,otp,issocial)
      .pipe(map((resp) =>
        resp.access_token?
        this.processLoginResponse(resp, rememberMe):resp,
      ));
  }



  getFeature(user)
  {


    return this.oidcHelperService
    .getFeature(user)
  }


  private processLoginResponse(response: LoginResponse, rememberMe?: boolean) {

    const accessToken = response.access_token;
    //  if (accessToken == null) {
    //    // Check if email is not confirmed
    //    if (response.errorMessage === 'Please confirm your email') {
    //      throw new Error('Please confirm your email');
    //    } else {
    //      throw new Error('User Not Found ?');
    //    }
    //  }
    rememberMe = rememberMe || this.rememberMe;

    const refreshToken = response.refresh_token || this.refreshToken;
    const tokenExpiryDate = new Date(response.expires_in);
    //tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + 60);
    tokenExpiryDate.setDate(tokenExpiryDate.getDate() + 1);
    const accessTokenExpiry = tokenExpiryDate;
    const jwtHelper = new JwtHelper();
    const decodedAccessToken = jwtHelper.decodeToken(
      accessToken
    ) as AccessToken;
    // const permissions = Array.isArray(decodedAccessToken.permission)
    //   ? decodedAccessToken.permission
    //   : decodedAccessToken.permission.split(',');

    if (!this.isLoggedIn) {
      this.configurations.import(decodedAccessToken.configuration);
    }
    const user = new User(
      decodedAccessToken.sub,
      decodedAccessToken.name,
      decodedAccessToken.fullName,
      decodedAccessToken.email,
      decodedAccessToken.jobtitle,
      decodedAccessToken.phone_number,
      decodedAccessToken.companyId,
      decodedAccessToken.usertype,
      decodedAccessToken.userimage,
      null,
      decodedAccessToken.twoFactorEnable,
      decodedAccessToken.roleName,
      decodedAccessToken.currency
      // Array.isArray(decodedAccessToken.role)
      //   ? decodedAccessToken.role
      //   : decodedAccessToken.role.split(','),

    );

    user.isEnabled = true;

    this.saveUserDetails(
      user,
      // permissions,
      accessToken,
      refreshToken,
      accessTokenExpiry,
      rememberMe
    );

    this.reevaluateLoginStatus(user);

    return user;
  }

  private saveUserDetails(
    user: User,
    // permissions: string[],
    accessToken: string,
    refreshToken: string,
    expiresIn: Date,
    rememberMe: boolean
  ) {

    if (rememberMe) {
      if (user.userType == 'Admin' || user.userType == 'Technician'|| 'Customer')
      {
      this.localStorage1.savePermanentData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage1.savePermanentData(refreshToken, DBkeys.REFRESH_TOKEN);
      this.localStorage1.savePermanentData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
      // this.localStorage.savePermanentData(permissions, DBkeys.USER_PERMISSIONS);
      this.localStorage1.savePermanentData(user, DBkeys.CURRENT_USER);
      }
    } else {
      if(user.userType=='Admin' || user.userType=='Technician'|| 'Customer')
      {
      this.localStorage1.saveSyncedSessionData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage1.saveSyncedSessionData(
        refreshToken,
        DBkeys.REFRESH_TOKEN
      );
      this.localStorage1.saveSyncedSessionData(
        expiresIn,
        DBkeys.TOKEN_EXPIRES_IN
      );
      // this.localStorage.saveSyncedSessionData(
      //   permissions,
      //   DBkeys.USER_PERMISSIONS
      // );
      this.localStorage1.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
      this.localStorage1.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
      this.localStorage1.saveSyncedSessionData(user.twoFactorEnable, DBkeys.Two_Factor_Auth);
      }
    }

    this.localStorage1.savePermanentData(rememberMe, DBkeys.REMEMBER_ME);
  }

  logout(): void {
    // if (this.isLoggedIn) {
      this.oidcHelperService.logout().subscribe({
        next: (data: any) => {
          this.localStorage1.deleteData(DBkeys.ACCESS_TOKEN);
          this.localStorage1.deleteData(DBkeys.REFRESH_TOKEN);
          this.localStorage1.deleteData(DBkeys.TOKEN_EXPIRES_IN);
          this.localStorage1.deleteData(DBkeys.USER_PERMISSIONS);
          this.localStorage1.deleteData(DBkeys.CURRENT_USER);

          this.configurations.clearLocalChanges();

          this.reevaluateLoginStatus();
        },
        error: (error) => {
          this.localStorage1.deleteData(DBkeys.ACCESS_TOKEN);
          this.localStorage1.deleteData(DBkeys.REFRESH_TOKEN);
          this.localStorage1.deleteData(DBkeys.TOKEN_EXPIRES_IN);
          this.localStorage1.deleteData(DBkeys.USER_PERMISSIONS);
          this.localStorage1.deleteData(DBkeys.CURRENT_USER);

          this.configurations.clearLocalChanges();

          this.reevaluateLoginStatus();
          console.log(error);
        },
      });
    // }
  }

  private reevaluateLoginStatus(currentUser?: User) {
    const user =
      currentUser || this.localStorage1.getDataObject<User>(DBkeys.CURRENT_USER);
    const isLoggedIn = user != null;


    if (this.previousIsLoggedInCheck !== isLoggedIn) {
      setTimeout(() => {
        this.loginStatus.next(isLoggedIn);
      });
    }

    this.previousIsLoggedInCheck = isLoggedIn;
  }

  getLoginStatusEvent(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  get currentUser(): User {
    const user = this.localStorage1.getDataObject<User>(DBkeys.CURRENT_USER);

    this.reevaluateLoginStatus(user);

    return user;
  }

  get userPermissions(): PermissionValues[] {
    return (
      this.localStorage1.getDataObject<PermissionValues[]>(
        DBkeys.USER_PERMISSIONS
      ) || []
    );
  }

  get accessToken(): string {
    return this.oidcHelperService.accessToken;
  }

  get accessTokenExpiryDate(): Date {
    return this.oidcHelperService.accessTokenExpiryDate;
  }

  get refreshToken(): string {
    return this.oidcHelperService.refreshToken;
  }

  get isSessionExpired(): boolean {
    return this.oidcHelperService.isSessionExpired;
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get rememberMe(): boolean {
    return (
      this.localStorage1.getDataObject<boolean>(DBkeys.REMEMBER_ME) === true
    );
  }

  clearStorage(): void {
    this.localStorage1.deleteData(DBkeys.ACCESS_TOKEN);
    this.localStorage1.deleteData(DBkeys.REFRESH_TOKEN);
    this.localStorage1.deleteData(DBkeys.TOKEN_EXPIRES_IN);
    this.localStorage1.deleteData(DBkeys.USER_PERMISSIONS);
    this.localStorage1.deleteData(DBkeys.CURRENT_USER);

    this.configurations.clearLocalChanges();
  }
  getLoginOtp(userName:string,password:string){
   return this.oidcHelperService.getLoginOtp(userName,password,'',false);
  }
  getProfileUpdateOtp(userName:string):Observable<any>{
    return this.oidcHelperService.getUpdateProfileOtp(userName);
   }






  //  new-----------------------------------

  private tokenKey = 'access_token';

  // constructor(private router: Router) {}

  // Save token in local storage
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decode token and extract roles
  getRoles(): string[] {
    const token = this.getToken();
    // debugger
    if (token) {
      try {
        const jwtHelper = new JwtHelper();
        const decodedToken = jwtHelper.decodeToken(
          token
        ) as any;

        return decodedToken.roleName || [];
      } catch (error) {
        console.error('Error decoding token:', error);
        this.logout();
      }
    }
    return [];
  }

  // Check if user has a specific role
  hasRoles(requiredRole:  string[]): boolean {
    const roles = this.getRoles();

    // return roles.includes(requiredRole);
    return requiredRole.some(role => roles.includes(role));
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Logout
  logoutUser() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
