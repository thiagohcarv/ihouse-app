import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nomeUsuario: any;
  public nome;
  

  constructor(public navCtrl: NavController, private usuarioProvider:UsuarioProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.nomeUsuario = Object( this.usuarioProvider.usuarioLogado);
    this.nome = this.nomeUsuario.nome;
  }

  onMensagens(){
    console.log("onMensagens()");
    this.navCtrl.push('MensagensPage');
  }

  onMyJobs(){
    console.log("onMyJobs()");
    this.navCtrl.push('MyjobsPage');
  }

  onOfferJobs(){
    this.navCtrl.push('CategoriaServicosPage');
    console.log("onOfferJobs()");
  }

  onSettings(){
    console.log("onSettings()");
  }

  onSearchJobs(){
    console.log("onSearchJobs()");
    this.navCtrl.push('SearchJobsCatPage');
  }

}
