import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../salesServices/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-customers',
  templateUrl: './import-customers.component.html',
  styleUrls: ['./import-customers.component.scss']
})
export class ImportCustomersComponent implements OnInit {
  fileError: boolean = false;
  uploadbtn:boolean=true
  file: File | null = null;

  constructor(private modalService: NgbModal,private customerService:CustomerService,private router :Router) {}

  ngOnInit(): void {

  }

  openFileModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Method to open the Google Sheet modal
  openGoogleSheetModal(googleSheetModalTemplate: any) {
    const modalRef = this.modalService.open(googleSheetModalTemplate, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then(
      (result) => {
        // Handle result here
      },
      (reason) => {
        // Handle dismiss reason here
      }
    );
  }

   // Handle file input change event
   onFileChange(event: any): void {

    const file = event.target.files[0];
    this.file=file
    // Allowed file extensions
    const allowedExtensions = ['.csv', '.xlsx', '.xls'];

    if (file) {
      // Get the file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Check if the file extension is valid
      if (file && allowedExtensions.includes(`.${fileExtension}`)) {
        this.fileError = false; // Reset error if file is valid
        this.uploadbtn=false
      } else {
        this.fileError = true; // Show error if the file is invalid
      }
    }
  }

  Upload(modal:any){

    console.log(this.file,'this.file');
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);

    this.customerService.uploadExcelFile(formData).subscribe({
      next:(res)=>{
        console.log(res);
        modal.close()
        this.router.navigate(['/admin/customer/customer-list'])
      },
      error:(err)=>{
        console.log('err',err);

      }
    })
  }

}
