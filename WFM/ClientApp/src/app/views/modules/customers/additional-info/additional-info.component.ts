import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
})
export class AdditionalInfoComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  additionalInfoForm: FormGroup;
  customerTypes: string[] = ['Individual', 'Business', 'Government'];
  exemptionReasons: string[] = [
    'Nonprofit',
    'Reseller',
    'Government',
    'Educational Institution',
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  resetForm() {
    this.additionalInfoForm.reset({
      customerType: '',
      isTaxExempt: false,
      exemptionReason: '',
      exemptionDetails: '',
      taxRate: '',
      openingBalance: '0.00',
      asOfDate: new Date().toISOString().split('T')[0], // Reset to today's date
    });
  }
  toggleTaxRate() {
    if (this.formGroup.get('isTaxExempt')?.value) {
      this.formGroup.get('taxRate')?.disable();
      this.formGroup.get('taxRate')?.setValue('');
    } else {
      this.formGroup.get('taxRate')?.enable();
    }
  }
}
