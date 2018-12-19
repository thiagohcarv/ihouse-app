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
  min_date: string;
  max_date: string;
  time: string;
  min_time: string;

  constructor(
    navParams: NavParams,
    private navCtrl: NavController,
    private dialog: Dialog,
    private auth: AuthProvider,
    private database: DatabaseProvider) {
    this.category = navParams.data.category;
    let now = new Date()
    this.min_date = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate()
    this.max_date = String(now.getFullYear()+5)
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
    datetime.setFullYear(parseInt(this.date.split('-')[0]))
    datetime.setMonth(parseInt(this.date.split('-')[1]))
    datetime.setDate(parseInt(this.date.split('-')[2]))
    datetime.setHours(parseInt(this.time.split(':')[0]))
    datetime.setMinutes(parseInt(this.time.split(':')[1]))
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
        image_lat_long: null
      };
      this.navCtrl.push('JobPaymentPage', { id: user.uid, job: job });
    })
  }
}
