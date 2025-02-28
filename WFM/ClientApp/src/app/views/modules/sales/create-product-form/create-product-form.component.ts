import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, RowDropSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductFormComponent implements OnInit {
  @ViewChild('grid', { static: false }) public grid: GridComponent;

  public data: any[] = [
    { id: 1, product: 'Item A', description: 'Desc A', qty: 2, rate: 10, amount: 20 },
    { id: 2, product: 'Item B', description: 'Desc B', qty: 1, rate: 15, amount: 15 },
    { id: 3, product: 'Item C', description: 'Desc C', qty: 3, rate: 5, amount: 15 },
  ];

  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public rowDropSettings: RowDropSettingsModel = { targetID: 'grid' };
  public sum: number = 0;
 // ✅ Dropdown data source
 public productList: any[] = [
  { id: 1, name: 'Bricks' },
  { id: 2, name: 'Hours' },
  { id: 3, name: 'Mobile' },
  { id: 4, name: 'Sales' },
];
  constructor() {
    this.editSettings = { allowEditing: true, allowDeleting: true, allowAdding: true, mode: 'Normal' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.calculateSum();
  }

  ngOnInit() {}

  calculateAmount(data: any) {
    data.amount = data.qty * data.rate;
  }

  actionComplete(args: any) {
    if (args.requestType === 'save') {
      this.calculateAmount(args.data);
      this.calculateSum();
    }
    if (args.requestType === 'delete') {
      this.data = this.data.filter(item => item.id !== args.data[0].id);  // Remove deleted row
      this.calculateSum();
    }
  }

  calculateSum() {
    this.sum = this.data.reduce((acc, item) => acc + item.amount, 0);
  }
}
