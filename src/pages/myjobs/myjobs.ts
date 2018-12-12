import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyjobsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myjobs',
  templateUrl: 'myjobs.html',
})
export class MyjobsPage {

  myJobs: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dialog:DialogoProvider, private servicoProvider:ServicosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyjobsPage');
    this._onLoadListServices();
  }

  onVerDetalhes(service:any){
    console.log(service);
    this.navCtrl.push('MyJobDetalhePage', {job: service});
  }

  _onLoadListServices(){
    this.servicoProvider.getListMyJobs().then(res=>{
      if(res){
        this.myJobs = res;
      }else{
        console.log(res);
        
      }
    }).catch(err=>{
      console.log(err);
      this.dialog.presentAlert("Ocorreu um erro ao carregar os seus trabalhos")
    });
  }

}
