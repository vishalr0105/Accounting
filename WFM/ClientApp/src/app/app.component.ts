import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'nobleui-angular';

  constructor(private http: HttpClient){

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
  }
}

