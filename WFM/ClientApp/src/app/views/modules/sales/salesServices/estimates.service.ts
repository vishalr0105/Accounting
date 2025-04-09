import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class EstimatesService {

  private readonly baseEndpoint = 'api/Estimate';

  constructor(private globalService: GlobalApiService) {}
  getEstimatesCount(status:any,date:any): Observable<any> {
    return this.globalService.request(
      'GET',
      `${this.baseEndpoint}/gettotalcount?status=${status}&date=${date}`
    );
  }
  getEstimates(pageSize:any,currentPage:any,status:any,date:any): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/estimates?pageSize=${pageSize}&currentPage=${currentPage}&status=${status}&date=${date}`);
  }
  viewEstimate(id:any): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/viewestimate?id=${id}`);
  }
  addEstimate(estimateData: any): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/addestimate`, estimateData);
  }
  updateEstimate(estimateData: any,id:any): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/updateestimate?id=${id}`, estimateData);
  }
  deleteEstimate(estimateId: string): Observable<any> {
    return this.globalService.request('DELETE', `${this.baseEndpoint}/deleteestimate`, null, { id: estimateId });
  }
  sendEstimate(): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/sendestimate`, {});
  }
  shareEstimateLink(): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/shareestimatelink`, {});
  }
  viewEstimateActivity(): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/viewestimateactivity`, {});
  }
  printEstimate(): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/printestimate`, {});
  }
  getEstimatesStaus(): Observable<any> {
    return this.globalService.request(
      'GET',
      `${this.baseEndpoint}/statuslist`
    );
  }
}
