import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandModel } from '@syncfusion/ej2-angular-grids';
import { IndividualLicenseCertificateModel } from 'src/app/views/models/IndividualLicenseCertificateModel.model';
import { IndividualLicenseSubtypeModel } from 'src/app/views/models/IndividualLicenseSubtypeModel.model';
import { IndividualLicensesubdisciplineModel } from 'src/app/views/models/IndividualLicensesubdisciplineModel.model';
import { AlertService } from 'src/app/views/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-individual-license-subtype',
  templateUrl: './individual-license-subtype.component.html',
  styleUrls: ['./individual-license-subtype.component.scss']
})
export class IndividualLicenseSubtypeComponent implements OnInit {
  public commands: CommandModel[];
  IndividualLicenseSubtypeRecord: IndividualLicenseSubtypeModel = new IndividualLicenseSubtypeModel();
  allIndividualLicensesubdiscipline:any=[];
  allIndividualLicenseSubtype:any=[];
  public format = { type: 'date', format: 'MMM dd, yyyy' };
  isDisabled: boolean = false;
  constructor(private modalService: NgbModal,private alert: AlertService) { }

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
    this.getAllallIndividualLicensesubdiscipline();
   // this.getAllallIndividualLicenseSubtype();
  }


  checkleavetype(type:string):string{
    let outputtype = '';

    let data = this.allIndividualLicensesubdiscipline.find(x => x.id == type);
    if (data != undefined) {
      outputtype = data.subdiscipline;
    }

    return outputtype;
  }

  save() {
    debugger
    if (this.IndividualLicenseSubtypeRecord.id == undefined) {
      // this.indivisualLicenseService.AddIndividualLicenseSubtypeMaster(this.IndividualLicenseSubtypeRecord).subscribe(
      //   resp => {
      //     this.IndividualLicenseSubtypeRecord = new IndividualLicenseSubtypeModel();
      //     this.alert.showToasterWithTitle(
      //       'Success',
      //       `Skill added successfully`,
      //       'success'
      //     );
      //     this.modalService.dismissAll();//
      //   //  this.getAllallIndividualLicenseSubtype();
      //   },
      //   (err) => {
      //     this.alert.showToasterWithTitle(
      //       'Failed',
      //       `Error while saving Skill`,
      //       'error'
      //     );
      //   });
    }
    else {
      // this.indivisualLicenseService.updateIndividualLicenseSubtypeMaster(this.IndividualLicenseSubtypeRecord).subscribe(
      //   resp => {
      //     this.IndividualLicenseSubtypeRecord = new IndividualLicenseSubtypeModel();
      //     this.alert.showToasterWithTitle(
      //       'Success',
      //       `Skill updated successfully`,
      //       'success'
      //     );
      //     this.modalService.dismissAll();
      //   //  this.getAllallIndividualLicenseSubtype();
      //   },
      //   (err) => {
      //     this.alert.showToasterWithTitle(
      //       'Failed',
      //       `Error while saving skill`,
      //       'error'
      //     );
      //   });
    }
  }


  openAddSkillModal(content: TemplateRef<any>) {
    this.isDisabled = false;
    this.modalService.open(content, { centered: true }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  getAllallIndividualLicensesubdiscipline() {
    // this.indivisualLicenseService.GetAllIndividualLicensesubdisciplineMaster().subscribe((res) => {
    //   this.allIndividualLicensesubdiscipline = res;
    // });
  }

  getAllallIndividualLicenseSubtype() {
    // this.indivisualLicenseService.GetAllIndividualLicenseSubtypeMaster().subscribe((res) => {
    //   this.allIndividualLicenseSubtype = res;
    // });
  }

  SettingClick(args) {
    if (args.commandColumn.title == 'edit') {
      this.edit(args.rowData.id);
      this.isDisabled = false;
    }
    else if (args.commandColumn.title == 'view') {
      this.edit(args.rowData.id);
      this.isDisabled = true;
    }
    else if (args.commandColumn.title == 'delete')
      this.delete(args.rowData.id);
  }

  edit(id: number) {
    document.getElementById('addbtn').click();
    this.getFormData(id);
    // this.modalService.open();
    //this.router.navigate(['/role-and-permission/add', id]);
  }

  getFormData(id) {
    this.IndividualLicenseSubtypeRecord = new IndividualLicenseSubtypeModel();
    let data = this.allIndividualLicenseSubtype.find(x => x.id == id);
    if (data != undefined) {
      this.IndividualLicenseSubtypeRecord = data;
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
        let model = {
          id : id
        }
        // this.indivisualLicenseService.deleteIndividualLicenseSubtypeMaster(model).subscribe((res) => {
        //   this.alert.showToasterWithTitle(
        //     'Success',
        //     `Record has been deleted`,
        //     'success'
        //   );
        // //  this.getAllallIndividualLicenseSubtype();
        // });
      }
    })
  }



}
