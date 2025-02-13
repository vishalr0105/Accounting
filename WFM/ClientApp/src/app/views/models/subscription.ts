export class SubscriptionModel {
  UserId: string;
  PlanId: string;
  StartDate?: Date;
  EndDate?: Date;
  Status: SubscriptionStatus;
  PauseFrom?: Date | null;
  PauseTill?: Date | null;
  CancellationDate?: Date | null;
  CancellationReason: string;
  constructor() {
    this.UserId = '';
    this.PlanId = '';
    this.StartDate = null;
    this.EndDate = null;
    this.Status = SubscriptionStatus.Pending;
    this.CancellationReason = '';
  }
}

enum SubscriptionStatus {
  Pending = 0,
  Active = 1,
  Expired = 2,
  Cancelled = 3
}

