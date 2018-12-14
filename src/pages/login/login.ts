import { UserInterface } from './../../interfaces/user';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { Dialog } from '../../providers/dialog/dialog';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  language: string;
  email: string = "";
  password: string = "";
  zipCode: string = "";

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private dialog: Dialog,
    private auth: AuthProvider,
    private translate: TranslateService,
    private database: DatabaseProvider
  ) {
    this.language = this.translate.currentLang;
  }

  onLogin(): void {
    this.dialog.showLoading();
    this.auth.login(this.email, this.password)
      .then((credential) => {
        this.dialog.hideLoading();
        if (credential.user.emailVerified) {
          this.database.getUserByID<UserInterface>(credential.user.uid).subscribe((userData) => {
            this.navCtrl.setRoot("HomePage", userData);
          })
        } else {
          this.dialog.presentConfirm(
            'You need to verify your e-mail',
            'Do you want to resend your verification code?',
            () => credential.user.sendEmailVerification()
          )
        }
      }, (err) => this.dialog.presentAlert(err.message));
  }

  onSingIn(): void {
    this.navCtrl.push('RegisterPage');
  }

  onForgot(): void {
    let alert = this.alertCtrl.create({
      message: "Type your e-mail:",
      inputs: [{ name: 'email', placeholder: 'E-mail' }],
      buttons: ['Cancel', {
        text: 'Send', handler: data => {
          if (data.email) {
            this.auth.resetPassword(data.email);
          }
        }
      }]
    });
    alert.present();
  }
  changeLanguage(): void {
    this.translate.use(this.language);
  }
}
