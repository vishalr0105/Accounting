import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAndServicePageComponent } from './product-and-service-page/product-and-service-page.component';
import { CreateFormComponent } from './create-form/create-form.component';

const routes: Routes = [
  {
    path:'',
    component:ProductAndServicePageComponent
  },
  // {
  //   path: 'create-form',
  //   component: CreateFormComponent
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAndServiceRoutingModule { }
