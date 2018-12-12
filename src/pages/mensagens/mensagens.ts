import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {

  mensagens: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dialogo:DialogoProvider, private mensageProvider: MensagensProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensagensPage');
    this._onLoadMensagens();
  }

  _onLoadMensagens(){
    this.mensageProvider.getListMensagens().then(res =>{
      console.log(res);
      if(res){
        this.mensagens = res;
      }else{
        this.dialogo.presentAlert("Falha ao carregar as suas mensagens");
      }
    }).catch(err =>{
      console.log(err);
      this.dialogo.presentAlert("Falha ao carregar as suas mensagens");
    });
  }

  onVerMensagemCompleta(msg:any){
    this.dialogo.presentMessage(msg.title, msg.mensagem);
  }

}
