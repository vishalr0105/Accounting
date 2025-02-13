import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TncRoutingModule } from './tnc-routing.module';
import { TnchomeComponent } from './tnchome/tnchome.component';
import { ServiceTermsComponent } from './service-terms/service-terms.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';


@NgModule({
  declarations: [
    TnchomeComponent,
    ServiceTermsComponent,
    PrivacypolicyComponent
  ],
  imports: [
    CommonModule,
    TncRoutingModule
  ]
})
export class TncModule { }
