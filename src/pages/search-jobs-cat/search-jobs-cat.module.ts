import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchJobsCatPage } from './search-jobs-cat';

@NgModule({
  declarations: [
    SearchJobsCatPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchJobsCatPage),
  ],
})
export class SearchJobsCatPageModule {}
