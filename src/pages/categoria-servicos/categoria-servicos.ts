import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriaServicosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria-servicos',
  templateUrl: 'categoria-servicos.html',
})
export class CategoriaServicosPage {

  categorias: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dialogo:DialogoProvider, private servicoProvider:ServicosProvider) {
  }

  ionViewCanEnter(){
    return this.servicoProvider.getListCategoreServices().then(res=>{
      if(res){
        this.categorias = res;
        return true;
      }else{
        this.dialogo.presentAlert("Ocorreu um erro ao listar as categoria");
        return false;
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  onSelectCategory(cat:any){
    console.log(cat);
    this.navCtrl.push('SelectDateServicePage', {categoria : cat});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaServicosPage');
  }

}
