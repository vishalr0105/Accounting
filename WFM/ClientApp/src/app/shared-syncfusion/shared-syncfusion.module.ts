import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { SYNCFUSION_MODULES, SYNCFUSION_SERVICES } from './syncfusion-modules';
import { SegmentedProgressBarComponent } from './segmented-progress-bar/segmented-progress-bar.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { SearchableDropdownComponent } from './searchable-dropdown/searchable-dropdown.component';



@NgModule({
  declarations: [DataTableComponent, SegmentedProgressBarComponent, DropdownMenuComponent, SearchableDropdownComponent],
  imports: [
    CommonModule,
    ...SYNCFUSION_MODULES
  ],
  providers: [
    ...SYNCFUSION_SERVICES
  ],
  exports: [DataTableComponent,SegmentedProgressBarComponent,DropdownMenuComponent,SearchableDropdownComponent]
})
export class SharedSyncfusionModule { }
