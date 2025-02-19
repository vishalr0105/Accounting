import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  @Input() label: string = 'Type';
  @Input() allowFiltering: boolean = false;
  @Input() items: { text: string, value: any }[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() defaultValue: any; // 👈 Add default value input
  @Output() itemSelected = new EventEmitter<any>();

  selectedValue: any; // Store selected value

  ngOnInit() {
    this.selectedValue = this.defaultValue;
  }

  onSelect(event: ChangeEventArgs) {
    this.selectedValue = event.value;
    this.itemSelected.emit(event.value);
  }
}
