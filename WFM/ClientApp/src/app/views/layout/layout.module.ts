import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { ContentAnimateDirective } from '../../core/content-animate/content-animate.directive';

import { NgbDropdownModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { FeatherIconModule } from '../../core/feather-icon/feather-icon.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GlobalsearchPipe } from './globalsearch.pipe';
import { GeneralModule } from '../pages/general/general.module';
import { UserService } from '../pages/general/services/user.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [BaseComponent, NavbarComponent, SidebarComponent, FooterComponent, ContentAnimateDirective, GlobalsearchPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbAccordionModule,
    PerfectScrollbarModule,
    FeatherIconModule,
    // GeneralModule
  ],
  providers: [UserService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class LayoutModule { }
