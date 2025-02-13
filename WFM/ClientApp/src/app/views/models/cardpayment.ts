//export interface CardPaymentRequest {
//  cardNumber: string;
//  expirationDate: string;
//  cvv: string;
//  email: string;
//  amount: number;
//  packageId: string;
//  userId: string;
//}

export interface CardPaymentRequest {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  email: string;
  amount: number;
  packageId: string;
  userId: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  nameOnCard: string;
  businessName: string;
  cardHolderName:string;
  currency:string;
  invoiceId:string;
}


