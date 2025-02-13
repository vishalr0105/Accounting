import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleandpermissionComponent } from './roleandpermission/roleandpermission.component';
import { AddroleandpermissionComponent } from './addroleandpermission/addroleandpermission.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FilterService, GridModule, GroupService, PageService, SortService } from '@syncfusion/ej2-angular-grids';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { RolePermissionComponent } from './rolepermission.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: RolePermissionComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: RoleandpermissionComponent
      },
      {
        path: 'add',
        component: AddroleandpermissionComponent
      },
      {
        path: 'add/:id',
        component: AddroleandpermissionComponent
      },
      {
        path: 'edit/:id',
        component: AddroleandpermissionComponent
      },
      {
        path: 'add/:id/:action',
        component: AddroleandpermissionComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    RoleandpermissionComponent,
    AddroleandpermissionComponent,
    RolePermissionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    // NgxDatatableModule,
    GridModule,
    FeatherIconModule
  ],
  providers: [PageService, SortService, FilterService, GroupService],
})
export class RoleandpermissionModule { }
