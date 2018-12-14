import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from './../../interfaces/category';

@IonicPage()
@Component({
  selector: 'page-search-jobs',
  templateUrl: 'search-jobs.html',
})
export class SearchJobsPage {
  categories: Category[] = [];

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.categories = navParams.data.categories;
  }
}