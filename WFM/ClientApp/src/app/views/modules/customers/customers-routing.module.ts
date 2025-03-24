import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'customer-list',
    pathMatch:'full'
  },
  {
    path:'customer-list',
    component:CustomerListComponent
  },
  // {
  //   path:'create-customer',
  //   component:NewCustomerComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
