import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  accountId = '1f1fae86-79b9-484f-acf6-d90032c1c0a1';
  companyName = 'Advintek Consulting Services';
  country = 'India';

  public pendingPurchases: Array<{ date: string; credits: string; totalPrice: string }> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
