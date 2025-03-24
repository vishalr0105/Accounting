import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SYNCFUSION_MODULES, SYNCFUSION_SERVICES } from 'src/app/shared-syncfusion/syncfusion-modules';
import { SharedSyncfusionModule } from 'src/app/shared-syncfusion/shared-syncfusion.module';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameAndContactComponent } from './name-and-contact/name-and-contact.component';
import { AddressesComponent } from './addresses/addresses.component';
import { NotesAndAttachmentsComponent } from './notes-and-attachments/notes-and-attachments.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    NewCustomerComponent,
    NameAndContactComponent,
    AddressesComponent,
    NotesAndAttachmentsComponent,
    PaymentsComponent,
    AdditionalInfoComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedSyncfusionModule,
    ReactiveFormsModule,
    ...SYNCFUSION_MODULES
    ],
    providers:[
      ...SYNCFUSION_SERVICES
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomersModule { }
