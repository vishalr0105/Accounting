import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GridModule} from '@syncfusion/ej2-angular-grids';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PricingComponent } from '../general/pricing/pricing.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { ForgetpwdComponent } from './forgetpwd/forgetpwd.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SharedModule } from '../../modules/shared/shared.module';
import { ExternalAppComponent } from './external-app/external-app.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
        // loadChildren:()=>import('./landing-page/landing-page.module').then(m=>m.LandingPageModule)
      },

      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register/:id',
        component: RegisterComponent
      },
      {
        path: 'company/register',
        component: RegisterComponent
      },
      {
        path: 'register/:id/:type',
        component: RegisterComponent
      },
      {
        path: 'verification/:id',
        component: VerifyEmailComponent,
        data: { title: 'Confirmation' },
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent
      },
      {
        path: 'forgetpwd',
        component: ForgetpwdComponent
      },
      {
        path: 'resetpwd',
        component: ResetpwdComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path:'Tnc',loadChildren:()=>import('../../modules/tnc/tnc.module').then(m=>m.TncModule)
      },
      { path: 'externalApp', component: ExternalAppComponent },

    ]
  },
]

@NgModule({
  declarations: [ AuthComponent, VerifyEmailComponent, ResetpwdComponent, ForgetpwdComponent],
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule,
    HttpClientModule,
    CurrencyPipe,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
})
export class AuthModule {

}
