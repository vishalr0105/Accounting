import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAndServiceRoutingModule } from './product-and-service-routing.module';
import { ProductAndServicePageComponent } from './product-and-service-page/product-and-service-page.component';
import { SYNCFUSION_MODULES, SYNCFUSION_SERVICES } from 'src/app/shared-syncfusion/syncfusion-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedSyncfusionModule } from 'src/app/shared-syncfusion/shared-syncfusion.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateFormComponent } from './create-form/create-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';


@NgModule({
  declarations: [
    ProductAndServicePageComponent,
    CreateFormComponent,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    ProductAndServiceRoutingModule,
    ReactiveFormsModule,
        FormsModule,
        SharedSyncfusionModule,
        HttpClientModule,
    ...SYNCFUSION_MODULES
    ],
    providers:[
      ...SYNCFUSION_SERVICES
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductAndServiceModule { }
