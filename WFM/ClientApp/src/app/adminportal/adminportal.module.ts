import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminportalRoutingModule } from './adminportal-routing.module';
import { AdminportalComponent } from './adminportal/adminportal.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../views/layout/layout.module';
import { DashboardModule } from '../views/pages/dashboard/dashboard.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminportalComponent,

  ],
  imports: [
    CommonModule,
    AdminportalRoutingModule,
    RouterModule,
    LayoutModule,
    DialogModule,
    FormsModule,
    DashboardModule
  ],
  providers:[]
})
export class AdminportalModule { }
