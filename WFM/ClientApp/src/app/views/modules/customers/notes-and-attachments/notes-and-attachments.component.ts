import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes-and-attachments',
  templateUrl: './notes-and-attachments.component.html',
  styleUrls: ['./notes-and-attachments.component.scss']
})
export class NotesAndAttachmentsComponent implements OnInit {
   @Input() formGroup!: FormGroup;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.notesAttachmentsForm.valueChanges.subscribe(() => {
    //   this.formDataChanged.emit(this.notesAttachmentsForm);
    // });
  }


  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.size <= 20 * 1024 * 1024) { // 20MB limit
      this.selectedFile = file;
      this.formGroup.patchValue({ attachment: file });
    } else {
      alert("File size exceeds 20 MB limit.");
      event.target.value = ''; // Reset file input
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.formGroup.patchValue({ attachment: null });
  }
}
