export class CancelSubscriptionRequest {
  cancelImmediatly: boolean;
  cancelOnNextRenewal: boolean;
  cancellationDate: Date;
  userId: string;
  reason: string;
}
