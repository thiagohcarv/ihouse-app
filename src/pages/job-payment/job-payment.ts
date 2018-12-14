import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PaypalProvider } from '../../providers/paypal/paypal';
import { Job } from '../../interfaces/job';
import { Dialog } from '../../providers/dialog/dialog';
import { SelectEmployeePage } from '../select-employee/select-employee';

@IonicPage()
@Component({
  selector: 'page-job-payment',
  templateUrl: 'job-payment.html',
})
export class JobPaymentPage {
  name: string;
  employerID: number;
  job: Job;
  idUser: string;
  paymentOK: boolean = false;

  constructor(
    navParams: NavParams,
    auth: AuthProvider,
    private paypal: PaypalProvider,
    private dialog: Dialog,
    private navCtrl: NavController,
    private db: DatabaseProvider
  ) {
    auth.getUser().subscribe((val) => {
      this.name = val.displayName;
      this.job = navParams.data.job;
      this.employerID = navParams.data.id;
    });
  }

  paymentFinish(){
    this.navCtrl.popToRoot();
  }

  onPayment(): void {
    console.log(this.employerID.toString());
    this.paypal.openPayment(`${this.job.category.value}`, 'USD', this.job.category.name, () =>{
      this.job.paid = true;
      this.job.employerID = this.employerID.toString()
      this.job.employee = {
        name : "",
        address: '',
        uuid: '',
        urlPhoto: '',
        type: '',
        skills: null,
        ssn: '',
        rating: 0,
        phone: '',
        isAutorized: null
      };
      this.dialog.showLoading();
      console.log(this.job);
      this.db.createJob<Job>(this.job);
      this.paymentOK = true;
      this.dialog.hideLoading();
    }, (err) =>{
      this.dialog.presentAlert(err);
    })
    // .then((res) => {
    //     console.log('SUCCESS', res);
    //   }).catch((err) => {
    //     this.dialog.presentAlert(err);
    //   });
  }
}
