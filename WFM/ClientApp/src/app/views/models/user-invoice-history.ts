import { DateTime } from "@syncfusion/ej2-angular-charts";

export interface UserInvoiceHistory {
  fullName: string;
  planName: string;
  amount: number;
  purchaseDate: DateTime;
}
