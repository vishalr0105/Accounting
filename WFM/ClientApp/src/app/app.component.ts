import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'nobleui-angular';
 
  constructor(){
   
  }
  ngAfterViewInit(): void {
  
  }
  ngOnInit(): void {

  }
  
}

