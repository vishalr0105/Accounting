import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SYNCFUSION_MODULES, SYNCFUSION_SERVICES } from 'src/app/shared-syncfusion/syncfusion-modules';
import { SharedSyncfusionModule } from 'src/app/shared-syncfusion/shared-syncfusion.module';


@NgModule({
  declarations: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
        SharedSyncfusionModule,
    ...SYNCFUSION_MODULES
    ],
    providers:[
      ...SYNCFUSION_SERVICES
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomersModule { }
