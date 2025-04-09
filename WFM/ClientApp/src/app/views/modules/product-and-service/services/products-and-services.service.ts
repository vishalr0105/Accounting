import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsAndServicesService {
  private readonly baseEndpoint = 'api/ProductServices';

  constructor(private globalService: GlobalApiService) {}
  // Get All Products and Services Method
  getAllProductsServices(): Observable<any> {
    return this.globalService.request(
      'GET',
      `${this.baseEndpoint}/getallproductsservices`
    );
  }
  createService(serviceData: any): Observable<any> {
    return this.globalService.request(
      'POST',
      `${this.baseEndpoint}/createservice`,
      serviceData
    );
  }
  getProductAndServicesById(id: string): Observable<any> {
    return this.globalService.request('GET', `${this.baseEndpoint}/getproductsservicebyid`, null, { id: id });
  }
  updateProductAndServicesById(data:any,id:string):Observable<any>{
    return this.globalService.request('POST', `${this.baseEndpoint}/updateproductservice`, data, { id: id });
  }
  inactivateProductsorServices(id: string): Observable<any> {
    return this.globalService.request('PATCH', `${this.baseEndpoint}/inactiveproductservice`, null, { id: id });
  }
}
