import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { HttpClientModule } from '@angular/common/http';

const route: Routes = [
  { path: '', component: AccountsComponent, pathMatch: 'full' },
  // { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AccountsComponent,
    AccountsComponent,
    ContactDetailsComponent,
    ContactDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    AccordionModule,
    RouterModule.forChild(route),
  ],
})
export class Customer360Module {}
