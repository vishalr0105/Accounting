import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GridModule, ResizeService } from '@syncfusion/ej2-angular-grids';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { ButtonAllModule, CheckBoxAllModule, CheckBoxModule, RadioButtonModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { ArchwizardModule } from 'angular-archwizard';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule, TextBoxAllModule, MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarAllModule, ContextMenuAllModule, TreeViewModule, AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';
import { ScheduleAllModule, RecurrenceEditorAllModule, DayService, DragAndDropService, TimelineMonthService, TimelineViewsService } from '@syncfusion/ej2-angular-schedule';
import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';
import { AddAttachmentsComponent } from './add-attachments/add-attachments.component';
import { SharedTableComponent } from './shared-table/shared-table.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    // AddappointmentsComponent,
    AddAttachmentsComponent,
    SharedTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NgxDatatableModule,
    GridModule,
    DropzoneModule,
    FeatherIconModule,
    SweetAlert2Module.forRoot(),
    ArchwizardModule,
    TabsModule.forRoot(),

    ScheduleAllModule, RecurrenceEditorAllModule,   NumericTextBoxAllModule, TextBoxAllModule, DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule,   ToolbarAllModule, DropDownListAllModule, ContextMenuAllModule, MaskedTextBoxModule, UploaderAllModule, MultiSelectAllModule,   TreeViewModule, ButtonAllModule, DropDownButtonAllModule, SwitchAllModule,  ToastAllModule, AppBarModule
  ],
  exports:[
    SharedTableComponent,
    // AddappointmentsComponent,
    AddAttachmentsComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NgxDatatableModule,
    GridModule,
    FeatherIconModule,
    SweetAlert2Module,
    CheckBoxModule,
    DropzoneModule,
    RadioButtonModule,
    ArchwizardModule,
    ScheduleAllModule, RecurrenceEditorAllModule,   NumericTextBoxAllModule, TextBoxAllModule, DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule,   ToolbarAllModule, DropDownListAllModule, ContextMenuAllModule, MaskedTextBoxModule, UploaderAllModule, MultiSelectAllModule,   TreeViewModule, ButtonAllModule, DropDownButtonAllModule, SwitchAllModule,  ToastAllModule, AppBarModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
    DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService
  ]

})
export class SharedModule {}
