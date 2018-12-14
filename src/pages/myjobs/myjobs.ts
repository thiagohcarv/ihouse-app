import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';


@IonicPage()
@Component({
  selector: 'page-myjobs',
  templateUrl: 'myjobs.html',
})
export class MyjobsPage {

  myJobs: any

  constructor(
    private api: ApiProvider,
    private navCtrl: NavController,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) { }

  ionViewDidLoad() {
    this.functions.loading()
    this.api.get('job').then(data => {
      this.myJobs = data
      this.functions.loader.dismiss()
    }).catch(() => this.functions.loader.dismiss())
  }

  onJobDetail(job:any){
    this.navCtrl.push('DetailJobPage', {id: job.id});
  }

}
