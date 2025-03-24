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
}
