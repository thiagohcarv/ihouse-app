import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Dialog } from '../../providers/dialog/dialog';
import { DatabaseProvider } from '../../providers/database/database';
import { Message } from '../../interfaces/message';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  mensagens: Message[] = [];

  constructor(private dialog: Dialog, private database: DatabaseProvider) { }

  ionViewDidLoad(): void {
    this.database.getMessages<Message>().subscribe((res) => {
      this.mensagens = res;
    }, err => {
      // TODO
    });
  }

  onVerMensagemCompleta(msg: Message): void {
    this.dialog.presentMessage(msg.title, msg.body);
  }
}
