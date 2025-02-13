import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendEmailComponent } from './send-email/send-email.component';
import { TalkToUsComponent } from './talk-to-us/talk-to-us.component';

const routes: Routes = [
  {path:'',component:SendEmailComponent},
    { path: 'talk-to-us', component: TalkToUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeedAssistanceRoutingModule { }
