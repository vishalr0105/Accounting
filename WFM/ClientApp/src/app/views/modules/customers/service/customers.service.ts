import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly baseEndpoint = 'api/Customer';

  constructor(private globalService: GlobalApiService) {}

  getCustomers(): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/getcustomers`).pipe(
      map((customers: any[]) =>
        customers.map(customer => ({
          id: customer.id,
          name: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          unbilledCharges: customer.unbilledCharges,
          phoneNumber: customer.phoneNumber || 'N/A',
          billingAddressFirstName:customer.billingAddressFirstName,
          billingAddressLastName:customer.billingAddressLastName,
          billingAddressLine1:customer.billingAddressLine1,
          billingAddressLine2:customer.billingAddressLine2,
          billingAddressCity:customer.billingAddressCity,
          billingAddressState:customer.billingAddressState,
          billingAddressCountry:customer.billingAddressCountry,
          firstName:customer.firstName

        }))
      )
    );
  }

  getCustomerById(customerId: string): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/getcustomerbyid`, null, { custId: customerId });
  }

  updateCustomerById(customerData: any, customerId: string): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/updatecustomer`, customerData, { custId: customerId });
  }

  searchCustomer(searchTerm: string): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/searchcustomer`, null, { searchterm: searchTerm });
  }

  createCustomer(customerData: any): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/createcustomer`, customerData);
  }

  updateCustomer(customerData: any): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/updatecustomer`, customerData);
  }

  deleteCustomer(customerId: string): Observable<any> {
    return this.globalService.request('DELETE', `${this.baseEndpoint}/deletecustomer`, null, { id: customerId });
  }

  inactivateCustomer(customerId: string): Observable<any> {
    return this.globalService.request('PATCH', `${this.baseEndpoint}/inactivecustomer`, null, { id: customerId });
  }
}
