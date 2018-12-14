import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Job } from '../../interfaces/job';

@IonicPage()
@Component({
  selector: 'page-search-content',
  templateUrl: 'search-content.html',
})
export class SearchContentPage {
  job: Job;
  view: boolean;

  constructor(navParams: NavParams) {
    this.job = navParams.data.job;
  }
}
