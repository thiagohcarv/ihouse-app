import { Injectable } from '@angular/core';
import { AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class FunctionsProvider {

  public loader: any;

  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  openModal(page, param = null, call = false) {
    let modal = this.modalCtrl.create(page, param);
    if(call){
      return new Promise((resolve) => {
        modal.onDidDismiss(data => {
          resolve(data)
        })
        modal.present()
      })
    }else{
      modal.present()
    }
  }

  message(text, duration=4000, position=null) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      position: position || 'bottom'
    })
    toast.present()
  }

  loading(text='Aguarde...') {
    this.loader = this.loadingCtrl.create({
      content: text,
      spinner: 'crescent'
    });
    this.loader.present();
  }

  showAlert(text, title='Atenção!'){
    const alert = this.alertCtrl.create({
      title: title,
      message: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  showAlertReturn(text, title='Atenção!'){
    return new Promise((resolve) => {
      const alert = this.alertCtrl.create({
        title: title,
        message: text,
        buttons: [{
          text: 'Ok',
          handler: () => {
            resolve(true);
          }
        }]
      });
      alert.present();
    })
  }

  showAlertConfirm(text, title='Atenção!', confirm='Confirmar', cancel='Cancelar'){
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title || 'Atenção',
        message: text || 'Deseja mesmo continuar?',
        buttons: [
          {
            text: cancel,
            role: 'cancel',
            handler: () => {
              reject(false);
            }
          },
          {
            text: confirm,
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    });
  }
}
