import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NewRole } from 'src/app/views/models/newRole';
import { AlertService } from 'src/app/views/services/alert.service';
import { NewroleService } from 'src/app/views/services/newrole.service';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Component({
  selector: 'app-roleandpermission',
  templateUrl: './roleandpermission.component.html',
  styleUrls: ['./roleandpermission.component.scss']
})
export class RoleandpermissionComponent implements OnInit {
  allNewRoles: any = [];
  newRole: NewRole = new NewRole();
  public commands: CommandModel[];
  public toolbarOptions?: ToolbarItems[];
  id: any
  public format = { type: 'date', format: 'MMM dd, yyyy hh:MM:ss' };
  constructor(private _newroleService: NewroleService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.toolbarOptions = ['Search'];
    // this.router.navigate(['/role-and-permission/add', 5]);
    this.commands = [
      {
        buttonOption: {
          iconCss: 'e-icons e-eye',
          cssClass: 'e-flat',

        }, title: "view"
      },
      {
        buttonOption: {
          iconCss: 'e-icons e-edit',
          cssClass: 'e-flat',

        }, title: "edit"
      },
      {
        buttonOption: {
          iconCss: 'e-icons e-trash',
          cssClass: 'e-flat'
        }, title: 'delete'
      },
    ];
    this.getAllRoles();
  }

  getAllRoles() {
    this._newroleService.getALLRoles().subscribe((res) => {
      // this.router.navigate(['/role-and-permission/add', 5]);
      this.allNewRoles = res;
    });
  }

  delete(id) {
    Swal.fire({
      title: ' Do you want to Delete the Role?',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._newroleService.deleteRole(id).subscribe((res) => {
          this.alertService.showToasterWithTitle(
            'Success',
            `Role has been Deleted`,
            'success'
          );
          this.getAllRoles();
          // this.router.navigate(['/role-and-permission/add', 5]);
          this.allNewRoles = res;
        });
      }
    })
  }

  SettingClick(args) {
    if(args.rowData.canDelete==false){

      if (args.commandColumn.title == 'edit')
        this.edit(args.rowData.id);
      else if (args.commandColumn.title == 'view')
        this.view(args.rowData.id);
      else
      this.alertService.showToasterWithTitle('Access denied','Delete or Edit not allowed','warning');
    }else{
    if (args.commandColumn.title == 'edit')
      this.edit(args.rowData.id);
    else if (args.commandColumn.title == 'delete')
      this.delete(args.rowData.id);
    else if (args.commandColumn.title == 'view')
      this.view(args.rowData.id);
  }
}

  edit(id: number) {
    this.router.navigate(['/admin/role-and-permission/add', id,'edit']);
  }

  view(id: number) {
    this.router.navigate(['/admin/role-and-permission/add', id, 'view']);
  }
  rowDataBound(ev:any){
    console.log(ev);

  }
}
