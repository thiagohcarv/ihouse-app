import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailJobPage } from './detail-job';

@NgModule({
  declarations: [
    DetailJobPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailJobPage),
  ],
})
export class DetailJobPageModule {}
