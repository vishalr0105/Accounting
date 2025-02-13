import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { TeamMemberService } from '../../services/team-member.service';
import { SignalRMsgVm } from '../../models/signalrmsg-model';
import { MessageType, RemoteAsstChatService } from '../../services/remote-assistant-signal-r.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ProgressbarService } from '../../services/progressbar.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoading: boolean;
  chatwindow = true;

  teammembers$: Observable<any>;
  teammembers: any;
  messages: any[] = [];
  form: FormGroup;
  selectedUser: any;
  messageType = MessageType;
  mysocketid = '';
  OnlineUsers: any;
  constructor(private router: Router, public teammemberservice: TeamMemberService,
    private fb: FormBuilder, private authservice: AuthService,
    public pgbservice: ProgressbarService,
    public chatservice: RemoteAsstChatService) {

    // Spinner for lazyload modules

    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.chatservice.objMsg = new SignalRMsgVm();
    this.createChatForm();
    this.teammembers$ = this.teammemberservice.getALLTeamMember();
    this.teammembers$.subscribe(res => {
      this.teammembers = res;
    })
    this.handleChatMessages();
  }
  showhideChatwindow() {
    this.chatwindow = !this.chatwindow
  }
  selectUser(user: any) {
    this.selectedUser = user;
    this.selectedUser.userImage = user.image;
    this.chatservice.objMsg.sendToUserId = this.selectedUser.id;
    this.chatservice.objMsg.receiverSocketId = this.selectedUser.socketId;
    this.chatservice.hubConnectionBuilder.invoke("GetChatHistory", this.chatservice.objMsg)
    this.messages = [];
    user.checked = !user.checked;
  }
  SendToAsync() {

    this.chatservice.objMsg.msg = this.form.controls['Msg'].value;
    if (this.chatservice.objMsg.msg == undefined || this.chatservice.objMsg.msg == null) {
      return false;
    }
    this.chatservice.objMsg.receiverSocketId = this.selectedUser.socketId;
    this.chatservice.objMsg.msgId = 0;
    this.chatservice.objMsg.msgType = this.messageType.ChatMsg;
    const newmsg = { ...this.chatservice.objMsg }
    this.messages.push(newmsg);
    this.chatservice.SendToAsync();
    this.form.controls['Msg'].setValue('');
  }
  createChatForm() {
    this.form = this.fb.group({
      MsgId: '0',
      Msg: new FormControl('', Validators.required),
      MsgType: 0,
      SenderSocketId: '',
      ReceiverSocketId: 'abc'
    });
  }
  setSocketIdOnTeamUser() {
    this.teammembers$.subscribe(res => {
      this.teammembers = res;
      var curUser = JSON.parse(sessionStorage.getItem('current_user'));
      this.teammembers.forEach(item => {
        var isexist = this.OnlineUsers.find(x => x.email == item.emailID);
        if (isexist) {
          item.socketId = isexist.socketId;

        } else {
          item.socketId = null;
        }
      });
      this.teammembers = this.teammembers.filter(x => x.emailID != curUser.email);
    })
  }
  handleChatMessages() {
    this.chatservice.objMsg.sendByUserId = this.authservice.currentUser.id;
    this.mysocketid = sessionStorage.getItem('SocketId');
    this.chatservice.objMsg.senderSocketId = this.mysocketid;

    this.chatservice.hubConnectionBuilder.on('OnlineUsers', data => {
      this.OnlineUsers = data;
      this.setSocketIdOnTeamUser();
    });
    this.chatservice.hubConnectionBuilder.on('getOnlineUsers', data => {
      this.OnlineUsers = data;
      this.setSocketIdOnTeamUser();
    });
    this.chatservice.hubConnectionBuilder.on("SendToAsync", (result: SignalRMsgVm) => {
      // this.beep.nativeElement.play();
      var onlineuser = this.teammembers.filter(t => t.socketId != null);
      if (this.selectedUser == undefined) {
        this.teammembers.forEach(element => {

          if (result.senderSocketId == element.socketId) {
            if (isNaN(element.newMsgsCount)) {
              element.newMsgsCount = 1;
            } else {
              element.newMsgsCount += 1;
            }
          }
        })
      } else {
        this.selectedUser.lastMsg = result.msg;
        this.messages.push(result)
        this.scrollToEnd();
      }
    });
    this.chatservice.hubConnectionBuilder.on('getMsgHistory', data => {
      this.messages = data;
    })

    this.chatservice.hubConnectionBuilder.on('SendToCallInvitation', data => {
      console.log(data);
      Swal.fire({
        title: data.msgType == MessageType.AudioCall ? 'Audio Call Invitation' : 'Video Call Invitation',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Accept'
      }).then((result) => {
        if (result['isConfirmed']) {
          this.chatservice.messages.push(data);
          this.chatservice.SendCallAcceptance();
          this.router.navigate(['admin/RemoteAssist/videocall/', data.senderSocketId, true, data.msgType])
        } else { this.chatservice.hubConnectionBuilder.invoke('RejectCall', data.senderSocketId); }
      })
    }
    )
  }
  scrollToEnd() {
    var chatWindow = document.getElementById("chatList");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}
