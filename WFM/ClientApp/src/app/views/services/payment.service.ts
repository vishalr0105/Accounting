// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import { Subject, forkJoin, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { ConfigurationService } from './configuration.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Permission, PermissionValues } from '../models/permission.model';
import { CardPaymentRequest } from '../models/cardpayment';
import { PayPalPaymentRequest } from '../models/paypalpayment';
import { UserBillingInfo } from '../models/user-billing-info-model';


@Injectable()
export class PaymentService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configurations: ConfigurationService) {

  }

  rootController = `${environment.baseUrl}/api/Payroll`;
  paymentController=`${environment.baseUrl}/api/payments`;
  paymentController_stripe=`${environment.baseUrl}/api/payment/`

  header = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
  })

  processCardPayment(cardPaymentRequest: CardPaymentRequest) {
    const url = `${this.configurations.baseUrl}/api/payment/card-payment`;
    return this.http.post(url, cardPaymentRequest);
  }

  processPayPalPayment(payPalPaymentRequest: PayPalPaymentRequest) {
    const url = `${this.configurations.baseUrl}/api/payment/paypal-payment`;
    return this.http.post(url, payPalPaymentRequest);
  }

  getUserPaymentInfo(userId: string): Observable<UserBillingInfo> {
    return this.http.get<UserBillingInfo>(`${this.configurations.baseUrl}/api/payment/GetUserPaymentInfo/${userId}`)
  }

  getPaymentInfo(): Observable<UserBillingInfo> {
    return this.http.get<UserBillingInfo>(`${this.configurations.baseUrl}/api/payment/GetUserPaymentInfo/`)
  }
  getReceiverPaymentInfo(): Observable<any> {
    return this.http.get(`${this.configurations.baseUrl}/api/payments/getAllPaymentInfo/`,{ headers: this.header });
  }

  getPayrollList(): Observable<any> {
    return this.http.get<any>(`${this.rootController}`, { headers: this.header });
  }

  getAllSkils() {
    return this.http.get<any>(`${this.rootController}`, { headers: this.header });
  }
  updatePaymentStatus(invid:string, sessionid:string) {
    return this.http.get<any>(`${this.paymentController_stripe}UpdatePaymentStatus?invoiceid=${invid}&sessionid=${sessionid}`, { headers: this.header });
  }
}


