import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalApiService } from 'src/app/gloable-services/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseEndpoint = 'api/ProductServices';

    constructor(private globalService: GlobalApiService) {}


  getProducts(): Observable<any> {
      return this.globalService.request('GET', `${this.baseEndpoint}/getallproductsservices`).pipe(
        map((products: any[]) =>
          products.map(product => ({
            id: product.id,
            name: product.name,
            // email: product.email,
            // unbilledCharges: product.unbilledCharges,
            // phoneNumber: product.phoneNumber || 'N/A'
          }))
        )
      );
    }
}
