import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-import-customers',
  templateUrl: './import-customers.component.html',
  styleUrls: ['./import-customers.component.scss']
})
export class ImportCustomersComponent implements OnInit {
  fileError: boolean = false;
  uploadbtn:boolean=true
  constructor(private modalService: NgbModal) {}

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
    debugger
    const file = event.target.files[0];

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

}
