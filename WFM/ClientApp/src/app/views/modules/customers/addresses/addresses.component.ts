import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  syncShippingAddress() {
    if (this.formGroup.get('sameAsBilling')?.value) {
      this.formGroup.patchValue({
        shippingStreet1: this.formGroup.get('billingStreet1')?.value,
        shippingStreet2: this.formGroup.get('billingStreet2')?.value,
        shippingCity: this.formGroup.get('billingCity')?.value,
        shippingState: this.formGroup.get('billingState')?.value,
        shippingZip: this.formGroup.get('billingZip')?.value,
        shippingCountry: this.formGroup.get('billingCountry')?.value,
      });
    } else {
      this.formGroup.patchValue({
        shippingStreet1: '',
        shippingStreet2: '',
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        shippingCountry: 'MYS',
      });
    }
  }
}
