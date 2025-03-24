import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-and-contact',
  templateUrl: './name-and-contact.component.html',
  styleUrls: ['./name-and-contact.component.scss'],
})
export class NameAndContactComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  customers: string[] = ['Famous Transport', 'ABC Logistics', 'XYZ Shipping'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.customerForm.valueChanges.subscribe(() => {
    //   this.formDataChanged.emit(this.customerForm);
    // });
  }
}
