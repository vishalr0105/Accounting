import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { SignalRMsgVm } from '../models/signalrmsg-model';
import { ActivatedRoute } from '@angular/router';
import { AlertService, DialogType } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteAsstChatService {
  public hubConnectionBuilder!: HubConnection;
  objMsg:SignalRMsgVm;
  start_url:string;
  messages: any[] = [];
  showjoinMeetingDialog=false;
  constructor(private activatedroute:ActivatedRoute, private alertservice:AlertService,) {
    this.objMsg = new SignalRMsgVm();
    this.initHubCon();
   }
   initHubCon(){
    this.hubConnectionBuilder=new HubConnectionBuilder().withUrl(environment.baseUrl+'/notify',{
      skipNegotiation:true,
      transport:signalR.HttpTransportType.WebSockets,
    })
      .withStatefulReconnect({ bufferSize: 12000 })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
     this.hubConnectionBuilder.start().then((con) => {
    //this.form.controls['SenderSocketId'].setValue(this.hubConnectionBuilder.connectionId);
    this.objMsg.senderSocketId = this.hubConnectionBuilder.connectionId;
    this.hubConnectionBuilder.invoke("OnUserConnected",this.objMsg)
       console.log('Connection started.......!')
       this.hubConnectionBuilder.on('SocketId', (data) => {
         sessionStorage.setItem('SocketId', data);
         this.objMsg.senderSocketId = data;
         var curUser = JSON.parse(sessionStorage.getItem('current_user'));
         this.hubConnectionBuilder.invoke('AddToOnlineList', { socketId: data, email: curUser.email });
         this.hubConnectionBuilder.invoke('GetOnlineUsers');
       });
       this.hubConnectionBuilder.on('SendToAsync',(data)=>{
        if(!window.location.href.includes('RemoteAssist')){
          if(data.msgType==7){
            this.showjoinMeetingDialog=true;
            this.start_url=data.msg;
            setTimeout(() => {
              this.showjoinMeetingDialog=false;
            }, 900000);
          }else{
        this.alertservice.showToasterWithTitle('Remote Assistant',data.msg,'info');}
        }
       })
  }).catch(err => console.log('Error while connect with server', err));
   this.hubConnectionBuilder.on('BroadCastAsync', (result: SignalRMsgVm) => {
   this.messages.push(result);
  });
   ;
   }
   SendToAsync(){
    if (this.objMsg.msg == undefined || this.objMsg.msg == null) {
      return false;
    }
    this.hubConnectionBuilder.invoke("SendTo",this.objMsg);
   }
  SendCallInvitation(){
    this.hubConnectionBuilder.invoke('SendToCallInvitation', this.objMsg);
  }
  SendCallAcceptance() {
    this.objMsg.msg = "Call Request Accepted";
    this.hubConnectionBuilder.invoke('SendCallAcceptance', this.objMsg);
  }
  

}
export enum MessageType {
  ChatMsg = 1,
  VideoCall = 2,
  RtcOffer = 3,
  RtcAnswer = 4,
  ImgAttach = 5,
  VideoAttach=6,
  ZoomLink=7,
  AudioCall=8,

}
