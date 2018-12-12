import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyjobsPage } from './myjobs';

@NgModule({
  declarations: [
    MyjobsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyjobsPage)
  ],
})
export class MyjobsPageModule {}
