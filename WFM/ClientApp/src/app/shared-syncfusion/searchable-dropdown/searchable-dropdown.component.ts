import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss']
})
export class SearchableDropdownComponent {
  @Input() dataSource: { [key: string]: Object }[] = [];
  @Input() fields: Object = { text: 'name', value: 'id' };
  @Input() placeholder: string = 'Select an option';

  @Output() selectionChanged = new EventEmitter<any>(); // Emits selected value

  onValueChange(event: any) {
    this.selectionChanged.emit(event.value); // Send the selected value to the parent
  }
}
