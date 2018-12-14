import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the DialogoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DialogoProvider {

  constructor(private alertCtrl: AlertController) { }

  presentAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: msg,
      buttons: ['Ok']
    });
    alert.present();
  }

  presentMessage(title:string, msg: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: ['Fechar']
    });
    alert.present();
  }

}
