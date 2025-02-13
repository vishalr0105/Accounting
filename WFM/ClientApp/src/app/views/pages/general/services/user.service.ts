import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from 'src/app/views/services/auth.service';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private emailSubject = new BehaviorSubject<string>('');
  private profileSubject = new BehaviorSubject<string>('');

  email$ = this.emailSubject.asObservable();
  profile$ = this.profileSubject.asObservable();

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }
  setEmail(newEmail: string): void {
    this.emailSubject.next(newEmail);
  }
  setProfile(profile: string): void {
    this.profileSubject.next(profile);
  }


  userGetProfile() {
    return this.get<any>('Account/getprofile');
  }

  userUpdateProfile(payload: any): Observable<any> {
    return this.put<any>('Account/updateprofile', payload);
  }

  industryList() {
    return this.get<any>('Account/industry');
  }

  jobTitleList() {
    return this.get<any>('Account/jobtitle');
  }

  // Notifications
  getNotifications() {
    return this.get<any>('Account/notificationstatus');
  }

  // Email
  getEmail() {
    return this.get<any>('Account/currentemail');
  }

  updateEmail(payload: any): Observable<any> {
    return this.put<any>('Account/updateEmail', payload);
  }

  // Password
  updatePassword(payload: any): Observable<any> {
    return this.put<any>('Account/resetpassword', payload);
  }

  // Workspace
  getWorkspace() {
    return this.get<any>('Account/workspace');
  }

  uploadImage(formData: FormData): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.accessToken}`
    });
  return this.http.post<any>(`${this.rootController}/Account/setprofileimage`, formData,
      {
        headers,
        reportProgress: true,
    })
  }

}
