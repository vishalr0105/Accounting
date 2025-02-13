import { Component, Input, OnInit } from '@angular/core';
import { Contacts } from 'src/app/views/models/Customer.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contactDetail: Contacts;
  constructor() {}

  ngOnInit(): void {}
}
