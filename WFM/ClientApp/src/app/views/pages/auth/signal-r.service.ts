import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
 hubconnection:signalR.HubConnection;
  constructor() { 


  }
  startConnection(){
    this.hubconnection=new signalR.HubConnectionBuilder().withUrl(
      'https://localhost:7109/notify',{
      skipNegotiation:true,
      transport:signalR.HttpTransportType.WebSockets,
      
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
    this.hubconnection.start().then(()=>console.log('connection started')).catch(err=>console.log('Connection error ',err));
  }
  SendToUser(){}
  msg(){}
}
