export class BackofficeSubscriptionPreviewRequest {
  cardNumber: number;
  expiry: string;
  cvv: number;
  fullName: string;
  street: string;
  city: string;
  zipCode: number;
  state: string;
  country: string;
  userId: string;
  planId: string;

  constructor(data: any = {}) {
    this.cardNumber = data.cardNumber || null;
    this.planId = data.selectedPlanId || null; // should i do this?
    this.expiry = (data.cardExpiryMonth || '') + "/" + (data.cardExpiryYear || '');
    this.cvv = data.cvv || null;
    this.fullName = (data.firstName || '') + " " + (data.lastName || '');
    this.street = data.street || '';
    this.city = data.city || '';
    this.zipCode = data.zipCode || null;
    this.state = data.state || '';
    this.country = data.country || '';
  }
}


