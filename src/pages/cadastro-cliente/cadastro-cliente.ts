import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  public usuario = {
    nome: "",
    email: "",
    endereco: "",
    tel: "",
    senha: "",
    confirmSenha: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public dialogo: DialogoProvider, private usuarioProvider:UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroClientePage');
  }

  onRegister(){
    let me = this;
    console.log(this.usuario);
    if(this.usuario.senha !== this.usuario.confirmSenha){
      this.dialogo.presentAlert("As senhas não conferem");
    }else{
      this.usuarioProvider.cadastrarUsuarioCliente(this.usuario).then((res)=>{
        console.log(res);
        if(res){
          me.dialogo.presentAlert("Cadastro realizado com sucesso!");
          me.navCtrl.pop();
        }else{
          me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
        }
      }).catch((error)=>{
        me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
        console.error(error);
      })
    }
  }

}
