import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: []
})
export class AuthComponent implements OnInit {

  constructor() {
/*    private signalrservice: SignalRService*/
  }

  ngOnInit(): void {
    //this.signalrservice.startConnection();
    //setTimeout(() => {
    //  this.signalrservice.SendToUser();
    //  this.signalrservice.msg();
    //}, 2000);
  }

}
