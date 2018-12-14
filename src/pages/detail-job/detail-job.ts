import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';


@IonicPage()
@Component({
  selector: 'page-detail-job',
  templateUrl: 'detail-job.html',
})
export class DetailJobPage {

  private id: number
  private job: any
  private is_functionary: boolean = false
  private is_accept: boolean = false

  constructor(
    private api: ApiProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) { }

  ionViewDidLoad() {
    this.functions.loading()

    this.id = this.navParams.data.id
    if (this.storage.getUser().functionary) {
      this.is_functionary = true
    }

    this.api.get('job/'+this.id).then(data => {
      this.job = data
      this.is_accept = this.job.is_accept
      this.functions.loader.dismiss()
    }).catch(() => this.functions.loader.dismiss())
  }

  accept(){
    this.functions.loading()
    this.api.patch('job/accept/'+this.job.id, {}).then(data => {
      this.functions.loader.dismiss()
      this.functions.message('Success! Job accepted.')
      this.navCtrl.setRoot('HomePage')
    }).catch(() => this.functions.loader.dismiss())
  }

  start(){
    this.functions.loading()
    this.api.patch('job/start/'+this.job.id, {}).then(data => {
      this.functions.loader.dismiss()
      this.functions.message('Success! Job started.')
      this.navCtrl.setRoot('HomePage')
    }).catch(() => this.functions.loader.dismiss())
  }

  finish(){
    this.functions.loading()
    this.api.patch('job/finish/'+this.job.id, {}).then(data => {
      this.functions.loader.dismiss()
      this.functions.message('Success! Job finished.')
      this.navCtrl.setRoot('HomePage')
    }).catch(() => this.functions.loader.dismiss())
  }

  onMessages(){
    this.navCtrl.push('MensagensPage', {job_id: this.job.id})
  }

  onBack(){
    this.navCtrl.pop()
  }
}
