import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Account } from '../models/Customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Customer360Service {
  rootController = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  getUserByUsername(userName: string , id) {
    if(id)
    {
      return this.http.get(
        `${this.rootController}/Customer360/check-user?email=${userName}&id=${id}`, {headers:this.header}
      );
    }
    else
    {
      return this.http.get(
        `${this.rootController}/Customer360/check-user?email=${userName}`, {headers:this.header}
      );
    }
  }

  createAccount(account:Account)
  {
    return this.http.post(`${this.rootController}/Customer360/createaccount`,account, {headers:this.header})
  }

  getAccountAndContacts()
  {
    return this.http.get(`${this.rootController}/Customer360/get-account-and-contacts`,{headers:this.header});
  }

  getContactsList()
  {
    return this.http.get(`${this.rootController}/Customer360/get-contacts`,{headers:this.header});
  }

  deleteContacts(id)
  {
    return this.http.delete(`${this.rootController}/Customer360/delete-contacts?id=${id}`, {headers:this.header})
  }

  deleteAccount(id)
  {
    return this.http.delete(`${this.rootController}/Customer360/delete-account?id=${id}`, {headers:this.header})
  }

  getContactsLog(id)
  {
    return this.http.get(`${this.rootController}/Customer360/get-contact-byid?id=${id}`, {headers:this.header})
  }
  getAccountLog(id)
  {
    return this.http.get(`${this.rootController}/Customer360/get-account-log?id=${id}`, {headers:this.header})
  }
}
