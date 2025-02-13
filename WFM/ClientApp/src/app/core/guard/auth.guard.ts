// import { Injectable } from '@angular/core';
// import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Route } from '@angular/router';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/views/services/auth.service';

// @Injectable()
// // export class AuthGuard implements CanActivate {
// //   constructor(private router: Router,private authService : AuthService) {}

// //   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
// //     // if (localStorage.getItem('isLoggedin') && this.authService.currentUser) {
// //     //   // logged in so return true
// //     //   console.log(this.authService.currentUser,"this.authService.currentUser")

// //     //   return true;
// //     // }

// //     // // not logged in so redirect to login page with the return url
// //     // this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
// //     // return false;
// //     let _route = state.url;
// //     if(_route.includes('?')){
// //     let baseurl= _route.split('?')[0];
// //     this.router.navigateByUrl(baseurl);
// //     }
// //     return this.checkRole(route.routeConfig)
// //   }
// //   private checkRole(route: Route): boolean {
// //     const requiredRole = route.data && route.data['role'];
// //     if(requiredRole =='Admin')
// //     {
// //     if (requiredRole && !this.authService.hasRole(requiredRole)) {
// //       this.router.navigate(['/login']);
// //       return false;
// //     }
// //     return true;
// //   }
// //   else if(requiredRole =='Technician')
// //   {
// //     if (requiredRole && !this.authService.hasRole(requiredRole)) {
// //       this.router.navigate(['/login']);
// //       return false;
// //     }
// //     return true;
// //   }
// //   }
// // }
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {

//     console.log('hiiiiii');

//   }

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const requiredRole = route.data['role'] as string;
//     console.log(requiredRole,'requiredRole');
//     console.log(this.authService.hasRoles('Admin'),'this.authService.hasRoles');

//     if (this.authService.isAuthenticated() && this.authService.hasRoles('Admin')) {
//       return true;
//     }else if(this.authService.isAuthenticated() && this.authService.hasRoles('User')){
//     // this.router.navigate(['/dashboard']);
//       return true
//     }

//     // Redirect to not-authorized page if role doesn't match
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/views/services/auth.service';

@Injectable({
  providedIn: 'root', // Recommended to use providedIn for dependency injection
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'] as string[]; // Fetch required role from route data
    console.log('Required Role:', requiredRole);

    // Check if the user is authenticated
    if (this.authService.isAuthenticated()) {
      // Check if the user has the required role
      if (this.authService.hasRoles(requiredRole)) {
        return true; // Allow access if role matches
      } else {
        console.warn('Access denied. Role mismatch.');
        this.router.navigate(['/not-authorized']); // Redirect to a "not authorized" page
        return false;
      }
    }

    console.warn('User is not authenticated.');
    this.router.navigate(['/login']); // Redirect to login page
    return false;
  }
}
