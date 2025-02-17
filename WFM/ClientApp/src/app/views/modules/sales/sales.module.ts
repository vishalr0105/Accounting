import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { EstimatesComponent } from './estimates/estimates.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { RecurringSalesComponent } from './recurring-sales/recurring-sales.component';
import { AccumulationChartModule, BarSeriesService, CategoryService, ChartModule, PieSeriesService, StackingBarSeriesService,AccumulationLegendService,AccumulationTooltipService, AccumulationAnnotationService,AccumulationDataLabelService} from '@syncfusion/ej2-angular-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@NgModule({
  declarations: [
    OverviewComponent,
    AllSalesComponent,
    InvoicesComponent,
    EstimatesComponent,
    SalesOrdersComponent,
    RecurringSalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ChartModule,
    AccumulationChartModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressBarModule
  ],
  providers:[BarSeriesService, StackingBarSeriesService, CategoryService,PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
    AccumulationAnnotationService]
})
export class SalesModule { }
