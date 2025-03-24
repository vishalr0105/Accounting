import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanydetailComponent } from '../views/pages/company-detail/companydetail/companydetail.component';
import { AllSubscription } from '../views/pages/general/allsubscribe/allsubscribe/allsubscribe.components';
import { BaseComponent } from '../views/layout/base/base.component';

const route: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () => import('../views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      { path: 'allsubscribe', component: AllSubscription },
      { path: 'home/company-detail', component: CompanydetailComponent },
      {path:'sales',loadChildren:()=>import('../views/modules/sales/sales.module').then(m=>m.SalesModule)},
      {path:'customer',loadChildren:()=>import('../views/modules/customers/customers.module').then(m=>m.CustomersModule)},
      {
        path: 'role-and-permission',
        loadChildren: () =>
          import(
            '../views/modules/roleandpermission/roleandpermission.module'
          ).then((m) => m.RoleandpermissionModule),
      },
      {
        path: 'form-elements',
        loadChildren: () =>
          import('../views/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule
          ),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('../views/pages/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('../views/pages/general/general.module').then(
            (m) => m.GeneralModule
          ),
      },
      {
        path: 'customer360',
        loadChildren: () =>
          import('../views/modules/customer360/customer360.module').then(
            (m) => m.Customer360Module
          ),
      },
      {
        path: 'notifications', loadChildren: () => import('../views/modules/notification/notification.module')
          .then(m => m.NotificationModule)
      },
      {
        path: 'help', loadChildren: () => import('../views/modules/faqs/faqs.module')
          .then(m => m.FaqsModule)
      },
      {
        path: 'needassistance',
        loadChildren: () =>
          import('../views/modules/need-assistance/need-assistance.module').then(
            (m) => m.NeedAssistanceModule
          ),
      },
      {path:'products',loadChildren:()=>import('../views/modules/product-and-service/product-and-service.module').then(m=>m.ProductAndServiceModule)},


    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class AdminportalRoutingModule { }
