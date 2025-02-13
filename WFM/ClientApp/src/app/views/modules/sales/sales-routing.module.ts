import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { EstimatesComponent } from './estimates/estimates.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { RecurringSalesComponent } from './recurring-sales/recurring-sales.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  {
    path:'overview',
    component:OverviewComponent
  },
  {
    path:'all-sales',
    component:AllSalesComponent
  },
  {
    path:'invoices',
    component:InvoicesComponent
  },
  {
    path:'estimates',
    component:EstimatesComponent
  },
  {
    path:'salesorders',
    component:SalesOrdersComponent
  },
  {
    path:'recurringsales',
    component:RecurringSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
