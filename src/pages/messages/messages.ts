import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UserInterface } from './../../interfaces/user';
import { AuthProvider } from '../../providers/auth/auth';
import { Dialog } from '../../providers/dialog/dialog';
import { DatabaseProvider } from '../../providers/database/database';
import { Message } from '../../interfaces/message';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  mensagens: any = [];
  userData: UserInterface;

  constructor(
    private dialog: Dialog,
    private auth: AuthProvider,
    private navCtrl: NavController,
    private database: DatabaseProvider,
  ) {
    this.auth.getUser().subscribe((user) => {
      if(user){
        if(this.userData == null){
          this.database.getUserByID<UserInterface>(user.uid).subscribe((userData) => {
            this.userData = userData;
            this.load()
          });
        }
      }
    })
  }

  load(){
    if (this.userData) {
      this.database.getMessages<Message>(this.userData.id).subscribe((res) => {
        this.mensagens = res.filter((val:any) => {
          if (!val.value.visualized) {
            return val.value
          }
        })
      }, err => {
        console.log(err)
      });
    }
  }

  onVerMensagemCompleta(msg: Message, key: string): void {
    msg.visualized = true
    this.database.updateMessage(key, msg)
    this.dialog.presentConfirmInvite(msg.title, msg.body, ()=> {
      if (msg.job) {
        this.navCtrl.push('JobInvitePage', {job: msg.job});
      }
    });
  }
}
