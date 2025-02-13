import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    TabModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
