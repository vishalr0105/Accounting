import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { EstimatesComponent } from './estimates/estimates.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { RecurringSalesComponent } from './recurring-sales/recurring-sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SYNCFUSION_MODULES, SYNCFUSION_SERVICES } from 'src/app/shared-syncfusion/syncfusion-modules';
import { SharedSyncfusionModule } from 'src/app/shared-syncfusion/shared-syncfusion.module';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { CreateProductFormComponent } from './create-product-form/create-product-form.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentLinksComponent } from './payment-links/payment-links.component';
import { SalesOrderNewComponent } from './sales-order-new/sales-order-new.component';
import { RecurringPaymentNewComponent } from './recurring-payment-new/recurring-payment-new.component';
import { ImportCustomersComponent } from './import-customers/import-customers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
// import { IgxGridModule } from 'igniteui-angular';
@NgModule({
  declarations: [
    OverviewComponent,
    AllSalesComponent,
    InvoicesComponent,
    EstimatesComponent,
    SalesOrdersComponent,
    RecurringSalesComponent,
    CreateProductFormComponent,
    EditPageComponent,
    EmailViewComponent,
    PaymentLinksComponent,
    SalesOrderNewComponent,
    RecurringPaymentNewComponent,
    ImportCustomersComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedSyncfusionModule,
    HttpClientModule,
    NgbModule,
    // AgGridModule.withComponents([]),
    // IgxGridModule,
    // GridModule ,
    // DropDownButtonModule,
    ...SYNCFUSION_MODULES
  ],
  providers:[
    ...SYNCFUSION_SERVICES
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesModule { }
