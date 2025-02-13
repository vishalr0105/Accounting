import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandModel } from '@syncfusion/ej2-angular-grids';
import { IndustryTypeService } from '../../services/industry-type.service';
import { AlertService } from '../../services/alert.service';
import { industryType } from '../../models/industryType';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-industry-type',
  templateUrl: './industry-type.component.html',
  styleUrls: ['./industry-type.component.scss']
})
export class IndustryTypeComponent implements OnInit {
  public commands: CommandModel[];
  industryType: industryType = new industryType();
  lits: any = [];
  public format = { type: 'date', format: 'MM/dd/yyyy' };
  isDisabled: boolean = false;
  industryTypeForm: FormGroup;

  constructor(private modalService: NgbModal,private fb: FormBuilder,private datePipe: DatePipe, private industryTypeService: IndustryTypeService, private alert: AlertService) {
    this.industryTypeForm = fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    });
   }

  ngOnInit(): void {
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
    this.getAllDepartments();
  }


  save() {

    if (this.industryTypeForm.invalid) {
      this.industryTypeForm.get('name').markAsTouched();
      return;
    }


    if (this.industryType.id == undefined) {
      this.industryTypeService.AddIndustryType(this.industryType).subscribe(
        resp => {
          this.industryType = new industryType();
          this.alert.showToasterWithTitle(
            'Success',
            `Industry type added successfully`,
            'success'
          );
          this.modalService.dismissAll();//
          this.getAllDepartments();
        },
        (err) => {
          this.alert.showToasterWithTitle(
            'Failed',
            `The Industry Name already exists`,
            'error'
          );
        });
    }
    else {
      this.industryTypeService.UpdateIndustryType(this.industryType).subscribe(
        resp => {
          this.industryType = new industryType();
          this.alert.showToasterWithTitle(
            'Success',
            `Industry type updated successfully`,
            'success'
          );
          this.modalService.dismissAll();
          this.getAllDepartments();
        },
        (err) => {
          this.alert.showToasterWithTitle(
            'Failed',
            `Error while saving Industry type`,
            'error'
          );
        });
    }
  }

lablename:any="Add new Industry";
  openAddSkillModal(content: TemplateRef<any>) {
    this.industryTypeForm.reset();
    this.isDisabled = false;
    this.lablename = "Add new Industry";
    this.industryType.name = "";
    this.modalService.open(content, { centered: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  openAddSkillModalForGetbyId(content: TemplateRef<any>) {
    this.industryTypeForm.reset();
    this.isDisabled = false;
    this.modalService.open(content, { centered: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  getAllDepartments() {
    this.industryTypeService.getIndustryTypes().subscribe((res) => {
      this.lits = res;
    });
  }

  
  SettingClick(args) {
    if (args.commandColumn.title == 'edit') {
      this.edit(args.rowData.id);
      this.isDisabled = false;
    }
    else if (args.commandColumn.title == 'view') {
      this.edit(args.rowData.id);
      this.isDisabled = true;
      this.lablename = "Industry"
    }
    else if (args.commandColumn.title == 'delete')
      this.delete(args.rowData.id);
  }

  edit(id: number) {
    document.getElementById('addbtn').click();
    this.getFormData(id);
    this.lablename = "Edit Industry"
    // this.modalService.open();
    //this.router.navigate(['/role-and-permission/add', id]);
  }

  getFormData(id) {
    this.industryType = new industryType();
    let data = this.lits.find(x => x.id == id);
    if (data != undefined) {
      this.industryType = data;
    }
  }

  delete(id) {
    Swal.fire({
      title: 'Do you want to delete the changes?',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.industryTypeService.deleteIndustryType(id).subscribe((res) => {
          this.alert.showToasterWithTitle(
            'Success',
            `Record has been deleted`,
            'success'
          );
          this.getAllDepartments();
        });
      }
    })
  }

}
