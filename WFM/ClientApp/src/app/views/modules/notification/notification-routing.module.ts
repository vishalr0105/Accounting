import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notifications } from '@syncfusion/ej2';
import { CompanyService } from '../../services/company.service';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: '', component: NotificationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [CompanyService],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
