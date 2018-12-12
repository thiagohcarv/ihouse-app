import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListJobsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-jobs',
  templateUrl: 'list-jobs.html',
})
export class ListJobsPage {

  services: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
   return this.services = this.navParams.data.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListJobsPage');
    console.log(this.navParams.data.data);
  }

}
