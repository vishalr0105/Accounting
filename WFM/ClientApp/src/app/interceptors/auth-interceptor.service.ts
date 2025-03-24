import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../views/services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    // Clone the request and add headers
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      }
    });



    // Debugging: Log request headers
    console.log('🔹 Intercepted Request URL:', req.url);
    console.log('🔹 Headers:', modifiedReq);

    return next.handle(modifiedReq);
  }
}
