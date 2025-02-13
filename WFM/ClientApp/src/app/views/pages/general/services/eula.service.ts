import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/views/services/auth.service';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EulaService extends BaseService {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getEulas() {
    return this.get<any>('Archive/eulas');
  }

  patchEulas(id:any,currentDocumentId:any,payload:any):Observable<any> {
    return this.patch<any>(`Archive/accepteuladocument?eulaId=${id}&eulaDocumentId=${currentDocumentId}`,payload);
  }

}
