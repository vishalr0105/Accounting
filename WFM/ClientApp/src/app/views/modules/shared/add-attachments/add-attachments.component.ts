import { Component, OnInit } from '@angular/core';
// import { filesModel } from 'src/app/views/services/attachments.service';

@Component({
  selector: 'app-add-attachments',
  templateUrl: './add-attachments.component.html',
  styleUrls: ['./add-attachments.component.scss']
})
export class AddAttachmentsComponent implements OnInit {
  files: any[] = [];
  imgExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  constructor() { }

  ngOnInit(): void {
  }

  onFileRemove(name,i) {
    // this.filesAdd.splice(i,1)
    this.files.splice(i,1)
  }

  addAttachment(event) {
    const files = event.target.files as File[];
    files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.files.push({
            blob:e.target.result,
            extension:file.type.split('/')[1],
            name:file.name,
            file:file
          })
          // this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    })
  }

}
