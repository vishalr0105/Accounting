import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-credit-management',
  templateUrl: './credit-management.component.html',
  styleUrls: ['./credit-management.component.scss']
})
export class CreditManagementComponent implements OnInit {
  @ViewChild('balanceDialog') balanceDialog!: DialogComponent;

  transactionTabHeader = { text: 'Transaction history' };
  allocationTabHeader = { text: 'Credit allocations' };

  selectedDate: Date = new Date();
  balance: number = 0;

  transactionHistoryData = [
    {
      date: new Date('2024-11-18T10:30:00Z'),
      type: 'Free credits',
      description: 'Free SignUp credits',
      createdBy: 'System',
      credits: 0,
      tags: '-',
    },
  ];

  dialogButtons = [
    {
      click: this.closeDialog.bind(this),
      buttonModel: { content: 'Close', isPrimary: true }
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.balanceDialog.show();
  }

  closeDialog(): void {
    this.balanceDialog.hide();
  }

}
