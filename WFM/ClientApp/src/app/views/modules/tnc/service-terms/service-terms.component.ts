import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-terms',
  templateUrl: './service-terms.component.html',
  styleUrls: ['./service-terms.component.scss']
})
export class ServiceTermsComponent implements OnInit {

  constructor(public location:Location) { }

  ngOnInit(): void {
  }

}
