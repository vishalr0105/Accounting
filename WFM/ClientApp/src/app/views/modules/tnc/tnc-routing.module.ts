import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceTermsComponent } from './service-terms/service-terms.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

const routes: Routes = [
  {path:'',children:[
    {path:'',component:ServiceTermsComponent},
    {path:'privacypolicy',component:PrivacypolicyComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TncRoutingModule { }
