import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentSetvicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-services',
  templateUrl: 'payment-services.html',
})
export class PaymentServicesPage {

  serviceCompleto: any[];
  public nomeUsuario: any;
  public nome;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioProvider:UsuarioProvider) {
    this.nomeUsuario = Object( this.usuarioProvider.usuarioLogado);
    this.nome = this.nomeUsuario.nome;
  }

  ionViewCanEnter(){
   return this.serviceCompleto = this.navParams.data.servico;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSetvicesPage');
    console.log(this.serviceCompleto);
  }

}
