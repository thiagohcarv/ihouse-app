import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayFinishPage } from './pay-finish';

@NgModule({
  declarations: [
    PayFinishPage,
  ],
  imports: [
    IonicPageModule.forChild(PayFinishPage),
  ],
})
export class PayFinishPageModule {}
