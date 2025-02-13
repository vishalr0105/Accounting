import { Injectable, NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  DefaultUrlSerializer,
  UrlTree,
} from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { Utilities } from './views/services/utilities';
import { ExternalAppComponent } from './views/pages/auth/external-app/external-app.component';

@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    const possibleSeparators = /[?;#]/;
    const indexOfSeparator = url.search(possibleSeparators);
    let processedUrl: string;

    if (indexOfSeparator > -1) {
      const separator = url.charAt(indexOfSeparator);
      const urlParts = Utilities.splitInTwo(url, separator);
      urlParts.firstPart = urlParts.firstPart.toLowerCase();

      processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
    } else {
      processedUrl = url.toLowerCase();
    }

    return super.parse(processedUrl);
  }
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./adminportal/adminportal.module').then(
        (m) => m.AdminportalModule
      ),
    canActivate: [AuthGuard],
    data: { role: ['Admin'] },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./adminportal/adminportal.module').then(
        (m) => m.AdminportalModule
      ),
    canActivate: [AuthGuard],
    data: { role: ['User'] },
  },
  { path: 'dashboard', component: ExternalAppComponent ,
    canActivate: [AuthGuard],
    // data: { role: ['User'] },
  },
  { path: 'paymentsuccess', component: ExternalAppComponent },
  { path: 'paymentfailed', component: ExternalAppComponent },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
