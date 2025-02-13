import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import {
  NgbDropdownModule,
  NgbDatepickerModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { ServicePerformanceComponent } from './service-performance/service-performance.component';
import {
  AccumulationChart,
  AccumulationChartAllModule,
  AccumulationLegendService,
  // ChartModule,
  ColumnSeriesService,
  DataLabelService,
  DateTimeService,
  LegendService,
  LineSeriesService,
  MultiColoredLineSeriesService,
  ParetoSeriesService,
  RangeNavigatorAllModule,
  SplineAreaSeriesService,
  SplineSeriesService,
  StackingAreaSeriesService,
  StackingLineSeriesService,
  StepLineSeriesService,
  StripLineService,
  TooltipService,
} from '@syncfusion/ej2-angular-charts';
import {
  BarSeriesService,
  StackingBarSeriesService,
} from '@syncfusion/ej2-angular-charts';
import { BusinessPerformanceComponent } from './business-performance/business-performance.component';
import { DispatcherComponent } from './dispatcher/dispatcher.component';
import { FinancialsComponent } from './financials/financials.component';
import { PlanningForcastingComponent } from './planning-forcasting/planning-forcasting.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
// import { AuthGuard } from '../../services/auth-guard.service';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import {
  PieSeriesService,
  AccumulationTooltipService,
  AccumulationAnnotationService,
  AccumulationDataLabelService,
} from '@syncfusion/ej2-angular-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DashboarduserComponent } from './dashboarduser/dashboarduser.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // { path: '',
      //   redirectTo: 'dispatcher',
      //   pathMatch: 'full' ,
      // },
      {
        path: 'service',
        component: ServicePerformanceComponent,
        canActivate: [AuthGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'bussines',
        component: BusinessPerformanceComponent,
        canActivate: [AuthGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'userDashboard',
        component: DashboarduserComponent,
        canActivate: [AuthGuard],
        data: { role: ['User'] },
      },
      {
        path: 'dispatcher',
        component: DispatcherComponent,
        canActivate: [AuthGuard],
        data: { role: ['Admin', 'User'] },
      },
      {
        path: 'financial',
        component: FinancialsComponent,
        canActivate: [AuthGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'planning',
        component: PlanningForcastingComponent,
        canActivate: [AuthGuard],
        data: { role: ['Admin', 'User'] },
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    ServicePerformanceComponent,
    BusinessPerformanceComponent,
    DispatcherComponent,
    FinancialsComponent,
    PlanningForcastingComponent,
    DashboarduserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbDatepickerModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    AccumulationChartModule,
    ChartModule,
    GridModule
  ],
  providers: [
    LineSeriesService,
    StepLineSeriesService,
    ,
    ParetoSeriesService,
    TooltipService,
    StackingAreaSeriesService,
    DataLabelService,
    LegendService,
    BarSeriesService,
    ColumnSeriesService,
    StackingBarSeriesService,
    StepLineSeriesService,
    SplineSeriesService,
    StackingLineSeriesService,
    DateTimeService,
    SplineAreaSeriesService,
    MultiColoredLineSeriesService,
    AccumulationLegendService,
    StripLineService,
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService,
  ],
})
export class DashboardModule {}
