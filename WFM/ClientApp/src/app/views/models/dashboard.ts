export class Dashboard {
  constructor(
    id?: string,
    key?: string,
    name?: string,
    description?: string,
    isActive?: boolean
  ) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }

  public id?: string;
  public key?: string;
  public name: string;
  public description: string;
  public isActive: boolean;
}

export interface DashboardReport {
  thisMonthRevenue: number;
  lastMonthRevenue: number;
  todayRevenue: number;
  yesterdayRevenue: number;
  unpaidInvoicesAmount: number;
  unpaidInvoicesCount: number;
  thisMonthSignUps: number;
  lastMonthSignUps: number;
  todaySignUps: number;
  yesterdaySignUps: number;
  freePlan: number;
  basicPlan: number;
  premPlan: number;
}

