import { Component, OnInit } from '@angular/core';
// import { SubscriptionPlanService } from 'src/app/views/services/subscription-plan.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  plans: any[];

  constructor(
    // private subscriptionService: SubscriptionPlanService
  ) { }

  ngOnInit(): void {
    this.getAllPlans();
  }

  getAllPlans() {
    // this.subscriptionService.getSubscriptionPlans().subscribe({
    //   next: (data: any) => {
    //     this.plans = data;
    //   },
    //   error: (error) => {
    //   }
    // });
  }
}
