import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class EstimatesService {

  private readonly baseEndpoint = 'api/Estimate';

  constructor(private globalService: GlobalApiService) {}

  getEstimates(): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/estimates`);
  }
  viewEstimate(): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/viewestimate`);
  }
  addEstimate(estimateData: any): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/addestimate`, estimateData);
  }
  updateEstimate(estimateData: any): Observable<any> {
    return this.globalService.request('POST', `${this.baseEndpoint}/updateestimate`, estimateData);
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
}
