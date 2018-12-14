import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  Loading,
  Alert,
  AlertOptions
} from 'ionic-angular';

@Injectable()
export class Dialog {
  private loading: Loading;
  private alert: Alert;

  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

  showLoading(): void {
    if (!!this.loading) return;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  hideLoading(): void {
    if (!this.loading) return;
    this.loading.dismiss();
    this.loading = null;
  }

  presentAlert(title: string): void {
    this.showAlert({ title: title, buttons: ['OK'] });
  }

  presentMessage(title: string, message: string): void {
    this.showAlert({ title: title, message: message, buttons: ['Close'] });
  }

  presentConfirm(title: string, subTitle: string, handler: () => void): void {
    this.showAlert({ title: title, subTitle: subTitle, buttons: ['Cancel', { text: 'Resend', handler: handler }] });
  }

  presentConfirmInvite(title: string, subTitle: string, handler: () => void): void {
    this.showAlert({ title: title, subTitle: subTitle, buttons: ['Cancel', { text: 'Ok', handler: handler }] });
  }

  private showAlert(opts: AlertOptions): void {
    if (!!this.loading) this.hideLoading();
    if (!!this.alert) this.hideAlert();
    this.alert = this.alertCtrl.create(opts);
    this.alert.present();
  }

  private hideAlert(): void {
    this.alert.dismiss();
    this.alert = null;
  }
}
