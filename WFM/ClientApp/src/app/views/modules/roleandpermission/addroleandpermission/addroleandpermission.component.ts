import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { NewroleService } from 'src/app/views/services/newrole.service';
import { Feature, Module, UserRole } from '../role';
import { forkJoin } from 'rxjs';
import { AlertService } from 'src/app/views/services/alert.service';
import { AuthService } from 'src/app/views/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addroleandpermission',
  templateUrl: './addroleandpermission.component.html',
  styleUrls: ['./addroleandpermission.component.scss']
})
export class AddroleandpermissionComponent implements OnInit {
  action: any;
  isDisabled: boolean = false;
  isDisabledEdit: boolean = false;

  modules: Feature[] = new Array<Feature>();
  checkedList: any;
  roleForm: FormGroup;
  role: UserRole = new UserRole();
  constructor(private _newroleService: NewroleService,
    private location: Location,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) {
    this.roleForm = this.fb.group({
      permissions: [null, [Validators.required]],
    });
  }
  masterSelected: boolean;

  ngOnInit(): void {
    this.masterSelected = false;
    this.route.params.subscribe(
      params => {
        this.role.id = params['id'];
        this.action = params['action'];
      });

    if (this.role.id != undefined) {
      this.getFormData(this.role.id);
    }
    else {
      this.getAllModules();
    }
    // this.checklist = [
    //   {id:1,value:'Elenor Anderson',isSelected:false},
    //   {id:2,value:'Caden Kunze',isSelected:true},
    //   {id:3,value:'Ms. Hortense Zulauf',isSelected:true},
    //   {id:4,value:'Grady Reichert',isSelected:false},
    //   {id:5,value:'Dejon Olson',isSelected:false},
    //   {id:6,value:'Jamir Pfannerstill',isSelected:false},
    //   {id:7,value:'Aracely Renner DVM',isSelected:false},
    //   {id:8,value:'Genoveva Luettgen',isSelected:false}
    // ];
  }

  getFormData(id) {
    this._newroleService.getNewRoleById(id).subscribe((res) => {
      this.role = res;
      this.modules = res.features;
      this.isAllSelected();
      if (this.action && this.action == 'view') {
        this.isDisabled = true;
      }

      if (this.action && this.action == 'edit') {
        //this.isDisabled = true;
        this.isDisabledEdit = true;
      }

    });
  }

  getAllModules() {
    this._newroleService.getALLModules().subscribe((res) => {
      this.modules = res;
      console.log("Get", this.modules);
    });
  }

  checkUncheckAllSubItems(index: number) {
    const role = this.modules[index];
    for (var i = 0; i < role.permissions.length; i++) {
      role.permissions[i].isSelected = role.isSelected;
    }
    this.isAllSelected();
  }

  isAllSelected() {
    for (var i = 0; i < this.modules.length; i++) {
      const role = this.modules[i];
      role.isSelected = role.permissions.every(function (item: any) {
        return item.isSelected === true;
      });
    }

    // Check if all roles have their main checkboxes selected
    this.masterSelected = this.modules.every(function (role: any) {
      return role.isSelected === true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];

    for (var i = 0; i < this.modules.length; i++) {
      const role = this.modules[i];
      for (var j = 0; j < role.permissions.length; j++) {
        const subItem = role.permissions[j];
        if (subItem.isSelected) {
          this.checkedList.push(subItem);
        }
      }
    }

    this.checkedList = JSON.stringify(this.checkedList);
  }

  async checkIfAnyPermissionSelected(): Promise<boolean> {
    // Iterate through modules
    for (const module of this.modules) {
      // Check each permission in the module
      for (const permission of module.permissions) {
        if (permission.isSelected) {
          return true; // Return true if any permission is selected
        }
      }
    }

    return false; // Return false if no permission is selected
  }

  // async save() {
  //   //await this.checkIfAnyPermissionSelected();
  //   if (this.checkIfAnyPermissionSelected()) {
  //     // let tempcounter = 0
  //     // this.modules.forEach(element => {
  //     //   let temp = element.permissions.filter(x => x.isSelected);
  //     //   if (temp.length == 0) {
  //     //     tempcounter++;
  //     //     // this.alertService.showToasterWithTitle(
  //     //     //   'Failed',
  //     //     //   `Please select permission`,
  //     //     //   'error'
  //     //     // );
  //     //     // return false;
  //     //   }
  //     // });
  //     // if (tempcounter == 0) {
  //     // if (this.modules.length != 0) {

  //     //   this.alertService.showToasterWithTitle(
  //     //     'Failed',
  //     //     `Please select permission`,
  //     //     'error'
  //     //   );
  //     //   return false;
  //     // }
  //     this.role.features = this.modules;
  //     console.log("Save", this.modules);
  //     this.role.companyId = this.authService.currentUser.companyId;
  //     if (this.role.id == undefined) {
  //       this._newroleService.addNewRole(this.role).subscribe(
  //         resp => {
  //           this.alertService.showToasterWithTitle(
  //             'Success',
  //             `Role added successfully`,
  //             'success'
  //           );
  //           this.goBack();
  //         },
  //         (err) => {
  //           this.alertService.showToasterWithTitle(
  //             'Failed',
  //             `Error while saving role`,
  //             'error'
  //           );
  //         });
  //     }
  //     else {
  //       this._newroleService.updateRoles(this.role).subscribe(
  //         resp => {
  //           this.alertService.showToasterWithTitle(
  //             'Success',
  //             `Role added successfully`,
  //             'success'
  //           );
  //           this.goBack();
  //         },
  //         (err) => {
  //           this.alertService.showToasterWithTitle(
  //             'Failed',
  //             `Error while saving role`,
  //             'error'
  //           );
  //         });
  //     }
  //   }
  //   else {
  //     this.alertService.showToasterWithTitle(
  //       'Failed',
  //       `Please select permission`,
  //       'error'
  //     );
  //   }
  //   // }
  //   // else{
  //   //   this.alertService.showToasterWithTitle(
  //   //     'Failed',
  //   //     `Please select permission`,
  //   //     'error'
  //   //   );
  //   // }
  // }

  save(): void {
    const anyPermissionSelected = this.modules.some(module =>
      module.permissions.some(permission => permission.isSelected)
    );

    if (anyPermissionSelected) {
      // Your existing save logic here
      this.role.features = this.modules;
      console.log("Save", this.modules);
      this.role.companyId = this.authService.currentUser.companyId;
      if (this.role.id == undefined) {
        this.role.canDelete=true;
        this._newroleService.addNewRole(this.role).subscribe(
          (resp:any) => {
            this.alertService.showToasterWithTitle(
              'Success',
             resp && resp.message? resp.message:'Role Added Successfully',
             'success'
            );
            this.goBack();
          },
          (err:any) => {
            this.alertService.showToasterWithTitle(
              'Failed',
              err.error,
              'error'
            );
          });
      }
      else {
        this._newroleService.updateRoles(this.role).subscribe(
          resp => {
            this.alertService.showToasterWithTitle(
              'Success',
              `Role Added Successfully`,
              'success'
            );
            this.goBack();
          },
          (err) => {
            this.alertService.showToasterWithTitle(
              'Failed',
              `Error while saving role`,
              'error'
            );
          });
      }
    } else {
      // Display error message or perform other actions
      this.alertService.showToasterWithTitle('Failed', 'Please select at least one permission', 'error');
    }
  }

  goBack(): void {
    this.location.back();
  }

  resetPermissions() {
    // Loop through the modules and their permissions
    for (let i = 0; i < this.modules.length; i++) {
      const module = this.modules[i];
      module.isSelected = false; // Unselect the module

      // Loop through the permissions within the module and unselect them
      for (let j = 0; j < module.permissions.length; j++) {
        module.permissions[j].isSelected = false;
      }
    }

    // You can also update the masterSelected flag if needed
    this.masterSelected = false;

    // Optionally, you can call the isAllSelected() method to update the UI
    this.isAllSelected();
  }

}
