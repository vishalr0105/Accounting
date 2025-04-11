import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../views/services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    // Clone the request and add headers
    let modifiedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.accessToken,
        Accept: 'application/json, text/plain, */*',
      }
    });

    // Check if the request body is FormData
    if (req.body instanceof FormData) {
      // If it's FormData, don't set 'Content-Type' manually
      // Angular will automatically set the 'Content-Type' to 'multipart/form-data'
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.accessToken,
        }
      });
    } else {
      // If it's not FormData, set the 'Content-Type' to 'application/json'
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.accessToken,
          'Content-Type': 'application/json',
        }
      });
    }

    // Debugging: Log request headers
    console.log('🔹 Intercepted Request URL:', req.url);
    console.log('🔹 Headers:', modifiedReq);

    return next.handle(modifiedReq);
  }
}
