import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root',
})
export class AllSalesService {
  private readonly baseEndpoint = 'api/AllSales';

  constructor(private globalService: GlobalApiService) {}
  getAllSalesOrdersCount(type:any,date:any,customer:any): Observable<any> {
    return this.globalService.request(
      'GET',
      `${this.baseEndpoint}/gettotalcount?type=${type}&date=${date}&customer=${customer}`
    );
  }
  getAllSalesOrders(pageSize:any,currentPage:any,type:any,date:any,customer:any): Observable<any> {
    return this.globalService.request(
      'GET',
      `${this.baseEndpoint}/getallsales?pageSize=${pageSize}&currentPage=${currentPage}&type=${type}&date=${date}&customer=${customer}
`
    );
  }
}
