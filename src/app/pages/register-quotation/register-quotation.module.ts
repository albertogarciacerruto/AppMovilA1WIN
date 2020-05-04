import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterQuotationPage } from './register-quotation.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterQuotationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterQuotationPage]
})
export class RegisterQuotationPageModule {}
