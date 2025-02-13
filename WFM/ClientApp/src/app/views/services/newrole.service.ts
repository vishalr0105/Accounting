import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewRole } from '../models/newRole';
import { Feature, Module, UserRole } from '../modules/roleandpermission/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewroleService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  rootController = `${environment.baseUrl}/api/NewRole`;

  header = new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  });
  // or if using an interceptor:

  addNewRole(newRole: UserRole) {
    return this.http.post(`${this.rootController}`, newRole, { headers: this.header });
  }

  getALLRoles() {
    return this.http.get<NewRole>(`${this.rootController}/GetAllRole`, { headers: this.header });
  }

  getALLModules() {
    // console.log(this.header, 'this.header');
    this.clearAuthorizationHeader()
    // Make the GET request with the Authorization header
    return this.http.get<Feature[]>(`${this.rootController}/GetAllFeatures`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*'
      })
    });
  }
  clearAuthorizationHeader() {
    this.header = this.header.delete('Authorization'); // If `this.header` is being used, remove 'Authorization'
  }
  getMenusbyUser() {
    return this.http.get<any>(`${this.rootController}/GetAllModules` , { headers: this.header });
  }

  getNewRoleById(id: string) {
    return this.http.get<UserRole>(`${this.rootController}/GetNewRoleById/${id}`, { headers: this.header });
  }

  deleteRole(id: string) {
    return this.http.get<NewRole>(`${this.rootController}/DeleteRole/${id}`, { headers: this.header });
  }

  updateRoles(newRole: UserRole) {
    return this.http.patch<UserRole>(`${this.rootController}/updateRoles`, newRole, { headers: this.header });
  }
  getTeamRole() {
    return this.http.get<UserRole>(`${this.rootController}/GetTeamRole`,{ headers: this.header });
  }

  getModulesByUserType(userType: string) {
    return this.http.get(`${this.rootController}/getModulesByUserType?userType=${userType}`, { headers: this.header });
}
updateModules(userType: string, module: string,selected:boolean) {
  const body = { userType, module,selected }; // Create the body object
  return this.http.put(`${this.rootController}/updateModules`, body, { headers: this.header });
}

}
