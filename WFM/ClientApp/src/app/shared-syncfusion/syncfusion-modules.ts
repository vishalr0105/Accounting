// Syncfusion Angular Modules
import { ChartModule, AccumulationChartModule, LegendService, TooltipService, DataLabelService, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { AggregateService, CommandColumnService, EditService, GridModule, GroupService, PageService, RowDDService, SearchService, SortService } from '@syncfusion/ej2-angular-grids';
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

// import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
// import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

// Syncfusion Chart Services
import { BarSeriesService, StackingBarSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts';
import { PieSeriesService, AccumulationLegendService, AccumulationTooltipService,
         AccumulationDataLabelService, AccumulationAnnotationService } from '@syncfusion/ej2-angular-charts';


// Export all Syncfusion modules
export const SYNCFUSION_MODULES = [
  ChartModule,
  AccumulationChartModule,
  ProgressBarModule,
  GridModule,
  TooltipModule,
  DatePickerModule,
  DialogModule,
  ButtonModule,
  ImageEditorModule,
  DropDownButtonModule,
  DropDownListModule,
  CheckBoxModule
];

// Export Syncfusion services
export const SYNCFUSION_SERVICES = [
  BarSeriesService,
  StackingBarSeriesService,
  CategoryService,
  PieSeriesService,
  AccumulationLegendService,
  AccumulationTooltipService,
  AccumulationDataLabelService,
  AccumulationAnnotationService,
  LegendService,
  TooltipService,
  DataLabelService,
  LineSeriesService,
  CommandColumnService,
  EditService,
  GroupService,
  PageService,
  SortService,
  SearchService,
  RowDDService,
  AggregateService
];
