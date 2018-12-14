import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchJobsListPage } from './search-jobs-list';

@NgModule({
  declarations: [
    SearchJobsListPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchJobsListPage),
  ],
})
export class SearchJobsListPageModule {}
