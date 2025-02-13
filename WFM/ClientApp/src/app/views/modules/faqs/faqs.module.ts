import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqComponent } from './faq/faq.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { FaqsearchPipe } from './faqsearch.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
  declarations: [
    FaqComponent,
    FaqsearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    FaqsRoutingModule,
    DialogModule
  ]
})
export class FaqsModule { }
