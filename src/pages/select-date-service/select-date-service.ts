import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectDateServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-date-service',
  templateUrl: 'select-date-service.html',
})
export class SelectDateServicePage {

  categoria: any[];
  dateSeleced: any;
  horaSelected: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dialogo:DialogoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectDateServicePage');
  }

  ionViewCanEnter(){
   return this.categoria = this.navParams.data.categoria;
  }

  onNext(){
    if(!this.dateSeleced || !this.horaSelected){
      this.dialogo.presentAlert("Campos obrigatório não preenchidos");
    }else{
      let servico = {
        data: this.dateSeleced,
        hora: this.horaSelected,
        servico: this.categoria
      }

      this.navCtrl.push('PaymentServicesPage', {servico : servico})

    }
  }

  

}
