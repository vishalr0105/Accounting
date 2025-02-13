export class AllInvoiceHistory {
  userId: string;
  id: string;
  date: Date;
  paymentDate: Date;
  invoiceStatus: InvoiceStatus;
  subscriptionId: string;
  paymentMethod: number;
  customerName: string;
  amount: number;
  planName: string;
}

enum InvoiceStatus {
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
  PendingPayment = 13
}
