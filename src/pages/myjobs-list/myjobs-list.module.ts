import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyjobsListPage } from './myjobs-list';

@NgModule({
  declarations: [MyjobsListPage],
  imports: [
    IonicPageModule.forChild(MyjobsListPage),
    TranslateModule.forChild()
  ]
})
export class MyjobsListPageModule { }
