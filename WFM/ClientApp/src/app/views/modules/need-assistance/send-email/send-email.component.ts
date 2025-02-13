import { Component, OnInit } from '@angular/core';
import { NeedassistanceService } from 'src/app/views/services/needassistance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  requestData = {
    requestType: '',
    subject: '',
    email: '',
    contactNumber: '',
    attachments: [] as File[]
  };

  constructor(private needassistanceService: NeedassistanceService) { }

  ngOnInit(): void { }

  onSubmit() {
    const readerPromises = this.requestData.attachments.map(file => {
        return new Promise<{ name: string; file: string }>((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    // Extract the base64 string (remove the data URL prefix)
                    const base64String = reader.result.split(',')[1];
                    resolve({ name: file.name, file: base64String });
                } else {
                    reject('FileReader result is not a string');
                }
            };
            
            reader.onerror = () => reject('Error reading file');
            reader.readAsDataURL(file);
        });
    });

    Promise.all(readerPromises).then(encodedAttachments => {
        const model = {
            requestType: this.requestData.requestType,
            subject: this.requestData.subject,
            contactNumber: this.requestData.contactNumber,
            email: this.requestData.email,
            attachments: encodedAttachments // Use base64-encoded files
        };

        this.needassistanceService.sendEmail(model).subscribe(response => {
            Swal.fire({
                title: 'We just received your email',
                text: 'We are working on your request and will get in touch as soon as possible. Thank You.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            this.resetForm();
        }, error => {
            console.error('Error sending email', error);
        });
    }).catch(error => {
        console.error('Error encoding files', error);
    });
}


  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    this.requestData.attachments = Array.from(fileList); // Ensure attachments are updated
    console.log('Files selected:', this.requestData.attachments);
  }

  resetForm() {
    this.requestData = {
      requestType: '',
      subject: '',
      contactNumber: '',
      email: '',
      attachments: []
    };
  }
}
