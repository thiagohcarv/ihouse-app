import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private name: string;

  constructor(
    private navCtrl: NavController,
    private storage: StorageProvider
  ) {
  }

  ionViewWillEnter() {
    if (!this.storage.getUser()) {
      this.storage.removeUser();
      this.navCtrl.setRoot(LoginPage)
    }else{
      this.name = this.storage.getUser().user.name;
    }
  }

  onMensagens(){
    this.navCtrl.push('MensagensPage');
  }

  onMyJobs(){
    this.navCtrl.push('MyjobsPage');
  }

  onOfferJobs(){
    this.navCtrl.push('CategoriaServicosPage');
  }

  onSettings(){
    this.navCtrl.push('CadastroClientePage')
  }

  onSearchJobs(){
    this.navCtrl.push('SearchJobsCatPage');
  }

}
