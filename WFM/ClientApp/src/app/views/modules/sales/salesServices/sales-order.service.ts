import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  private readonly baseEndpoint = 'api/SalesOrder';

  constructor(private globalService: GlobalApiService) {}
  getSalesOrderCount(status:any,date:any): Observable<any> {
    return this.globalService.request(
      'GET',
      `${this.baseEndpoint}/gettotalcount?status=${status}&date=${date}`
    );
  }
  getSalesOrders(pageSize:any,currentPage:any,status:any,date:any): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/salesorders?pageSize=${pageSize}&currentPage=${currentPage}&status=${status}&date=${date}`);
  }
  addSalesOrder(estimateData: any): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/addsalesorder`, estimateData);
  }
 viewSalesOrder(id:any): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/viewsalesorder?id=${id}`);
  }
  updateSalesOrder(data: any,id:any): Observable<any> {
    const endpoint = `${this.baseEndpoint}/updatesalesorder?id=${id}`;
    return this.globalService.request('POST', endpoint, data);
  }
  getSalesOrderStaus(): Observable<any> {
    return this.globalService.request(
      'GET',
      `${this.baseEndpoint}/statuslist`
    );
  }
}
