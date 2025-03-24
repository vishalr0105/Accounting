import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() fields!: { key: string; label: string; type: string; options?: string[],condition?:string }[];
  @Input() sectionKey!: string;
}
