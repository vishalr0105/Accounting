import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talk-to-us',
  templateUrl: './talk-to-us.component.html',
  styleUrls: ['./talk-to-us.component.scss']
})
export class TalkToUsComponent implements OnInit {
// email:'mailto:info@etaprise.com';
email:'info@nvisionbeyond.com';

  constructor() { }

  ngOnInit(): void {

  }

  isPopupVisible = false;
  formData = { name: '', email: '', message: '', attachment: null };

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  onFileSelected(event: any) {
    this.formData.attachment = event.target.files[0];
  }

  submitForm() {
    console.log('Form Data:', this.formData);
    this.togglePopup();
  }

}
