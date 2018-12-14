import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';


@IonicPage()
@Component({
  selector: 'page-search-jobs-cat',
  templateUrl: 'search-jobs-cat.html',
})
export class SearchJobsCatPage {

  categorias: any;

  constructor(
    private api: ApiProvider,
    private navCtrl: NavController,
    private functions: FunctionsProvider
  ) { }

  ionViewDidLoad() {
    this.functions.loading()
    this.api.get('category').then(data => {
      this.categorias = data
      this.functions.loader.dismiss()
    }).catch(() => this.functions.loader.dismiss())
  }

  onSelectCategory(cat:any){
    this.navCtrl.push('ListJobsPage', {id: cat.id, thumb: cat.thumb});
  }

}
