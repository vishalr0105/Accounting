import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
     @Input() formGroup!: FormGroup;

  paymentMethods: string[] = ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash', 'Check'];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {  }

}
