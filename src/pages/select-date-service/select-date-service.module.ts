import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectDateServicePage } from './select-date-service';

@NgModule({
  declarations: [
    SelectDateServicePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectDateServicePage),
  ],
})
export class SelectDateServicePageModule {}
