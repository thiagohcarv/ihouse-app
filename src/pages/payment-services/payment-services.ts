import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';


@IonicPage()
@Component({
  selector: 'page-payment-services',
  templateUrl: 'payment-services.html',
})
export class PaymentServicesPage {

  serviceCompleto: any;
  private name: string;

  constructor(
    private api: ApiProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) {
    this.name = this.storage.getUser().user.name
  }

  ionViewDidLoad(){
    this.serviceCompleto = this.navParams.data.servico;
  }

  pay(){
    this.functions.loading()
    let services = []
    this.serviceCompleto.servico.services.forEach(val => {
      services.push(val.id)
    })
    const data = {
      services: services,
      datetime: this.serviceCompleto.data+' '+this.serviceCompleto.hora+':00',
      price: this.serviceCompleto.servico.price,
      payed: true
    }
    this.api.post('job', data).then(()=>{
      this.functions.loader.dismiss()
      this.functions.message('Success! Service Payed.')
      this.navCtrl.setRoot('HomePage')
    }).catch(() => this.functions.loader.dismiss())
  }
}
