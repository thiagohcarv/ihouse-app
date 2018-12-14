import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';

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

  jobs: any = [];
  category_id: number
  category_thumb: string

  constructor(
    private api: ApiProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) { }

  ionViewDidLoad() {
    this.functions.loading()
    this.category_id = this.navParams.data.id;
    this.category_thumb = this.navParams.data.thumb;

    this.api.get('job', {category: this.category_id}).then(data => {
      this.jobs = data
      this.functions.loader.dismiss()
    }).catch(() => this.functions.loader.dismiss())
  }

  onInviteJob(job){
    if(this.storage.getUser().user.functionary){
      this.navCtrl.push('DetailJobPage', {id: job.id})
    }else{
      this.functions.message('You aren\'t a provider.')
    }
  }
}
