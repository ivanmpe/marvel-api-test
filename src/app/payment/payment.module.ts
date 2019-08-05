import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'
import { PaymentPage } from './payment.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskIonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
