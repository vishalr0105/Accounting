// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import { Subject, forkJoin, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { AccountEndpoint } from './account-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { UserEdit } from '../models/user-edit.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Permission, PermissionValues } from '../models/permission.model';
import { UserRegister } from '../models/user-register.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }

@Injectable()
export class AccountService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation =
    'modify';

  private rolesChanged = new Subject<RolesChangedEventArg>();
  rootController = `${environment.baseUrl}/api/account`;
  registeruser = `${environment.baseUrl}/api/Account/register`;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private accountEndpoint: AccountEndpoint
  ) { }

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  getUser(userId?: string) {
    return this.accountEndpoint.getUserEndpoint<User>(userId);
  }

  registerTeamMember(model: any) {
    return this.http.post(`${this.rootController}/RegisterTeamMember`, model);
  }

  getUserAndRoles(userId?: string) {
    return forkJoin([
      this.accountEndpoint.getUserEndpoint<User>(userId),
      this.accountEndpoint.getRolesEndpoint<Role[]>(),
    ]);
  }

  getSalesPersons(companyID) {
    return this.http.get(`${this.rootController}/get-sales-persons?companyId=${companyID}`, { headers: this.header });
  }
  getUsers(page?: number, pageSize?: number) {
    return this.accountEndpoint.getUsersEndpoint<User[]>(page, pageSize);
  }

  getUsersAndRoles(page?: number, pageSize?: number) {
    return forkJoin([
      this.accountEndpoint.getUsersEndpoint<User[]>(page, pageSize),
      this.accountEndpoint.getRolesEndpoint<Role[]>(),
    ]);
  }

  getIndustryType(): Observable<any> {
    return this.http.get(`${this.rootController}/GetIndustryTypes`)
  }
  updateUser(user: UserEdit) {
    if (user.id) {
      return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
    } else {
      return this.accountEndpoint
        .getUserByUserNameEndpoint<User>(user.userName)
        .pipe(
          mergeMap((foundUser) => {
            user.id = foundUser.id;
            return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
          })
        );
    }
  }
  getZoomAccessToken(code: string) {
    return this.http.get(`${this.rootController}/GetZoomToken?code=${code}`);
  }

  getUserByUsername(userName: string, userId?: string) {
    return this.http.get(
      `${this.rootController}/users/checkusername?userName=${userName}&userId=${userId}`
    );
  }


  newUser(user: UserEdit) {
    return this.accountEndpoint.getNewUserEndpoint<User>(user);
  }

  getUserPreferences() {
    return this.accountEndpoint.getUserPreferencesEndpoint<string>();
  }

  updateUserPreferences(configuration: string) {
    return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
  }

  deleteUser(userOrUserId: string | User): Observable<User> {
    if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
      return this.accountEndpoint
        .getDeleteUserEndpoint<User>(userOrUserId as string)
        .pipe<User>(tap((data) => this.onRolesUserCountChanged(data.roles)));
    } else {
      if (userOrUserId.id) {
        return this.deleteUser(userOrUserId.id);
      } else {
        return this.accountEndpoint
          .getUserByUserNameEndpoint<User>(userOrUserId.userName)
          .pipe<User>(mergeMap((user) => this.deleteUser(user.id)));
      }
    }
  }

  unblockUser(userId: string) {
    return this.accountEndpoint.getUnblockUserEndpoint(userId);
  }

  userHasPermission(permissionValue: PermissionValues): boolean {
    return this.permissions.some((p) => p === permissionValue);
  }

  refreshLoggedInUser() {
    return this.accountEndpoint.refreshLogin();
  }

  getRoles(page?: number, pageSize?: number) {
    return this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize);
  }

  getRolesAndPermissions(page?: number, pageSize?: number) {
    return forkJoin([
      this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize),
      this.accountEndpoint.getPermissionsEndpoint<Permission[]>(),
    ]);
  }

  updateRole(role: Role) {
    if (role.id) {
      return this.accountEndpoint
        .getUpdateRoleEndpoint(role, role.id)
        .pipe(
          tap((data) =>
            this.onRolesChanged([role], AccountService.roleModifiedOperation)
          )
        );
    } else {
      return this.accountEndpoint
        .getRoleByRoleNameEndpoint<Role>(role.name)
        .pipe(
          mergeMap((foundRole) => {
            role.id = foundRole.id;
            return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id);
          }),
          tap((data) =>
            this.onRolesChanged([role], AccountService.roleModifiedOperation)
          )
        );
    }
  }

  newRole(role: Role) {
    return this.accountEndpoint
      .getNewRoleEndpoint<Role>(role)
      .pipe<Role>(
        tap((data) =>
          this.onRolesChanged([role], AccountService.roleAddedOperation)
        )
      );
  }

  deleteRole(roleOrRoleId: string | Role): Observable<Role> {
    if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
      return this.accountEndpoint
        .getDeleteRoleEndpoint<Role>(roleOrRoleId as string)
        .pipe<Role>(
          tap((data) =>
            this.onRolesChanged([data], AccountService.roleDeletedOperation)
          )
        );
    } else {
      if (roleOrRoleId.id) {
        return this.deleteRole(roleOrRoleId.id);
      } else {
        return this.accountEndpoint
          .getRoleByRoleNameEndpoint<Role>(roleOrRoleId.name)
          .pipe<Role>(mergeMap((role) => this.deleteRole(role.id)));
      }
    }
  }

  getPermissions() {
    return this.accountEndpoint.getPermissionsEndpoint<Permission[]>();
  }

  private onRolesChanged(roles: Role[] | string[], op: RolesChangedOperation) {
    this.rolesChanged.next({ roles, operation: op });
  }

  onRolesUserCountChanged(roles: Role[] | string[]) {
    return this.onRolesChanged(roles, AccountService.roleModifiedOperation);
  }

  getRolesChangedEvent(): Observable<RolesChangedEventArg> {
    return this.rolesChanged.asObservable();
  }

  get permissions(): PermissionValues[] {
    return this.authService.userPermissions;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  verifyEmail(id: string) {
    return this.http.post(`${this.rootController}/verify`, { userId: id });
  }

  registerNewUser(user: UserRegister): Observable<UserRegister> {
    return this.accountEndpoint.getNewUserEndpoint<UserRegister>(user);
  }
  registerCompany(data: any): Observable<any> {
    return this.http.post(this.accountEndpoint.CompanyRegistration, data);
  }
  sendResetPwdLink(email): Observable<any> {
    return this.http.get(this.rootController + '/SendResetPwdLink?emailid=' + email);
  }
  updatePwd(data: any): Observable<any> {

    return this.http.post(this.rootController + '/resetpwd', data)
  }
  VerifyProfileChangeOtp(data: any): Observable<any> {
    return this.http.post(this.rootController + '/VerifyProfileChangeOtp', data)
  }

  registerUser(data: any): Observable<any> {
    console.log(data, 'data');

    return this.http.post<any>(`${this.registeruser}`, data)
  }
}
