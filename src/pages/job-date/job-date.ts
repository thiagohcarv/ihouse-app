import { Dialog } from '../../providers/dialog/dialog';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../../interfaces/category';
import { Job } from '../../interfaces/job';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-job-date',
  templateUrl: 'job-date.html',
})
export class JobDatePage {
  category: Category;
  date: string;
  time: string;

  constructor(
    navParams: NavParams,
    private navCtrl: NavController,
    private dialog: Dialog,
    private auth: AuthProvider,
    private database: DatabaseProvider) {
    this.category = navParams.data.category;
  }

  onNext() {
    if (!this.date) {
      this.dialog.presentAlert('Date is a required field.');
      return;
    }
    if (!this.time) {
      this.dialog.presentAlert('Time is a required field.');
      return;
    }
    const now: number = new Date().getTime();
    const datetime = new Date();
    console.log(this.date)
    datetime.setFullYear(this.date.split('-')[0])
    datetime.setMonth(this.date.split('-')[1])
    datetime.setDate(this.date.split('-')[2])
    datetime.setHours(this.time.split(':')[0])
    datetime.setMinutes(this.time.split(':')[1])
    console.log(datetime)
    const timestamp: number = datetime.getTime();

    if (timestamp < now) {
      this.dialog.presentAlert('Start date need to be greater or equal than now.');
      return;
    }
    this.dialog.showLoading();
    this.auth.getUser().subscribe((user) => {
      this.dialog.hideLoading();
      let job: Job = {
        category: this.category,
        hasAccepted: false,
        timestamp: timestamp,
        paid: false,
        employee: null,
        employerID: null,
        hasCompleted: false,
        urlPhoto: null,
        latitude: null,
        longitude: null,
      };
      this.navCtrl.push('JobPaymentPage', { id: user.uid, job: job });
    })
  }
}
