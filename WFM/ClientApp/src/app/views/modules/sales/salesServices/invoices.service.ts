import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private readonly baseEndpoint = 'api/Invoices';

 constructor(private globalService:GlobalApiService) { }

 getInvoices(): Observable<any> {
  return this.globalService.request('GET',`${this.baseEndpoint}/invoices`);
}

viewInvoice(): Observable<any> {
  return this.globalService.request('GET', `${this.baseEndpoint}/viewinvoice`);
}

addInvoice(invoiceData: any): Observable<any> {
  const endpoint = `${this.baseEndpoint}/addinvoice`;
  return this.globalService.request('POST', endpoint, invoiceData);
}

updateInvoice(invoiceData: any): Observable<any> {
  const endpoint = `${this.baseEndpoint}/updateinvoice`;
  return this.globalService.request('POST', endpoint, invoiceData);
}

deleteInvoice(invoiceId: string): Observable<any> {
  const endpoint = `${this.baseEndpoint}/deleteinvoice?id=${invoiceId}`;
  return this.globalService.request('DELETE', endpoint);
}

sendInvoice(): Observable<any> {
  const endpoint = `${this.baseEndpoint}/sendinvoice`;
  return this.globalService.request('POST', endpoint, {});
}

shareInvoiceLink(): Observable<any> {
  const endpoint = `${this.baseEndpoint}/shareinvoicelink`;
  return this.globalService.request('POST', endpoint, {});
}

// New method for viewing invoice activity
viewInvoiceActivity(): Observable<any> {
  const endpoint = `${this.baseEndpoint}/viewinvoiceactivity`;
  return this.globalService.request('POST', endpoint, {});
}

printInvoice(): Observable<any> {
  const endpoint = `${this.baseEndpoint}/printinvoice`;
  return this.globalService.request('POST', endpoint, {});
}
}
