import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';


@IonicPage()
@Component({
  selector: 'page-categoria-servicos',
  templateUrl: 'categoria-servicos.html',
})
export class CategoriaServicosPage {

  private categorias: any;

  constructor(
    private api: ApiProvider,
    private navCtrl: NavController,
    private functions: FunctionsProvider
  ) { }

  ionViewDidLoad(){
    this.functions.loading()
    this.api.get('category').then(data => {
      this.categorias = data
      this.functions.loader.dismiss()
    }).catch(() => this.functions.loader.dismiss())
  }

  onSelectCategory(cat:any){
    this.navCtrl.push('SelectDateServicePage', {categoria: cat});
  }
}
