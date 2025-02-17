import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.scss']
})
export class AllSalesComponent implements OnInit {

  salesData = [
    { label: "Estimates", subtext: "0 estimates", progress: 10, color: "#2196F3" }, // Blue
    { label: "Unbilled Income", subtext: "$0.00", progress: 20, color: "#9C27B0" }, // Purple
    { label: "Overdue Invoice", subtext: "$11.04", progress: 30, color: "#FF9800" }, // Orange
    { label: "Open Invoices", subtext: "$64.13", progress: 25, color: "#BDBDBD" }, // Gray
    { label: "Recently Paid", subtext: "$0.00", progress: 15, color: "#4CAF50" } // Green
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
