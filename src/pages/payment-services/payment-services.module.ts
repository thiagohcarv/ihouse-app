import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentServicesPage } from './payment-services';

@NgModule({
  declarations: [
    PaymentServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentServicesPage),
  ],
})
export class PaymentServicesPageModule {}
