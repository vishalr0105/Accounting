
export class SignalRMsgVm {
  msgId: number;
  senderSocketId: string | null;
  msg: string | null;
  msgType: number;
  receiverSocketId: string | null;
  isRead: boolean;
  sendByUserId: string | null;
  sendToUserId: string | null;
}
