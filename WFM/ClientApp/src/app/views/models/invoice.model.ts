


export enum PaymentMethod {
  Nothing = 0,
  Paypal = 1,
  Card = 2,
  Cash = 3,
  Cheque = 4,
  BankTransfer = 5,
  BankRemittance = 6,
}

export enum InvoiceStatus {
  Draft = 0,
  PendingApproval = 1,
  Approved = 2,
  Rejected = 3,
  Sent = 4,
  PartialPayment = 5,
  Paid = 6,
  Overdue = 7,
  Void = 8,
  Archived = 9,
  Disputed = 10,
  Processing = 11,
  OnHold = 12,
  PendingPayment = 13,
}


export class receivePayment {
  id: string;
  transactionId: string;
  clientName: string;
  invoiceRefId: string;
  paymentDate: Date;
  amountPaid: number;
  paymentMethod: string;
  status: string;
  currencyType: string;
  clientSecret: string;
}

