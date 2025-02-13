import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedIndustry: string = 'defence'; // Default industry

  // Method to update selected industry
  selectIndustry(industry: string): void {
    this.selectedIndustry = industry;
  }

}
