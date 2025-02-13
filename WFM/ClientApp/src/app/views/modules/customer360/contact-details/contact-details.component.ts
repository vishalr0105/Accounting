import { Component, Input, OnInit } from '@angular/core';
import { Contacts } from 'src/app/views/models/Customer.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contactDetail:Contacts[] = [];
  tableData = []
  constructor() { }

  ngOnInit(): void {
    var models = [];

    this.contactDetail.map((x,i)=>{

      var model ={
        "Full Name":x.contactName,
        Status: x.activityStatus,
        Company:x.account_Name,
        "Designation": x.designation,
        "Email":x.emailID,
        "Mobile No":x.mobileNumber,
        "Last Changed": (new Date(x.updatedAt)).toLocaleString()
      };
      models.push(model)
    })
    this.tableData = models
  }
}
