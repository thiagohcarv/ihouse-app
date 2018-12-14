import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';

@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {

  private job_id: number;
  private mensagens: any = [];

  constructor(
    private api: ApiProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) { }

  ionViewDidLoad() {
    this.functions.loading()
    let data: any = Object()
    if (this.navParams.data.job_id) {
      this.job_id = this.navParams.data.job_id
      data.job = this.job_id
    }
    this.api.get('message', data).then(data => {
      this.mensagens = data
      this.functions.loader.dismiss()
    }).catch(() => this.functions.loader.dismiss())
  }

  showMessage(msg:any){
    this.functions.showAlert(msg.title, msg.mensagem);
  }

}
