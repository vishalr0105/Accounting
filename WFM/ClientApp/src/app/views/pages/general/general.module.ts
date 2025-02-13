import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconModule } from '../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { GeneralComponent } from './general.component';
import { BlankComponent } from './blank/blank.component';
import { FaqComponent } from './faq/faq.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { TimelineComponent } from './timeline/timeline.component';
import { Routes, RouterModule } from '@angular/router';
import { AllSubscription } from './allsubscribe/allsubscribe/allsubscribe.components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamMemberService } from '../../services/team-member.service';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EulaComponent } from './eula/eula.component';
import { CreditManagementComponent } from './credit-management/credit-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'blank-page',
        component: BlankComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'user-settings',
        component: UserSettingsComponent
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent
      },
      {
        path: 'eula',
        component: EulaComponent
      },
      {
        path: 'credit-management',
        component: CreditManagementComponent
      },
    ]
  }
]

@NgModule({
  declarations: [GeneralComponent,
    BlankComponent,
    FaqComponent,
    InvoiceComponent,
    PricingComponent, TimelineComponent, AllSubscription, UserSettingsComponent, AccountSettingsComponent, EulaComponent, CreditManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    MatTabsModule,
    TabModule,
    DialogModule,
    DatePickerModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [TeamMemberService],
  // exports:[UserService]
})
export class GeneralModule { }
