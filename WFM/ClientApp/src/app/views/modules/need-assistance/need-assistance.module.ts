import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeedAssistanceRoutingModule } from './need-assistance-routing.module';
import { SendEmailComponent } from './send-email/send-email.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TalkToUsComponent } from './talk-to-us/talk-to-us.component';

@NgModule({
  declarations: [
    SendEmailComponent,
    TalkToUsComponent
  ],
  imports: [
    CommonModule,
    NeedAssistanceRoutingModule,
    FormsModule 
  ]
})
export class NeedAssistanceModule { }
