import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyjobDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myjob-detalhe',
  templateUrl: 'myjob-detalhe.html',
})
export class MyJobDetalhePage {

  public myJob: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
    return this.myJob = this.navParams.data.job;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyjobDetalhePage');
    
    console.log(this.myJob);
  }

}
