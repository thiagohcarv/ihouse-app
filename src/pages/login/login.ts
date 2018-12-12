import { UsuarioProvider } from '../../providers/usuario/usuario';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string = "";
  public senha: string = "";
  public zipCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dialogo: DialogoProvider, private usuarioProvider:UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(){
    console.log("senha: ", this.senha, "email: ", this.email);
    if(this.email !== "" && this.senha !== ""){
      this.usuarioProvider.loginUsuario(
        {
          email: this.email.toLocaleLowerCase(),
	        senha: this.senha.toLocaleLowerCase()
        }
      ).then((res)=>{
        console.log(res);
        if(res){
          this.navCtrl.setRoot('HomePage');        
        }else{
          this.dialogo.presentAlert("Usuário ou senha inválidos.");
        }        
      });
    }else{
      this.dialogo.presentAlert("Informe o Login e Senha para acessar.")
    }
  }
    

  onSingIn(){ 
    console.log("Cadastrar novo usuário.");
    this.navCtrl.push('CadastroClientePage');
  }

}
