import { Dialog } from './../../providers/dialog/dialog';
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInterface } from './../../interfaces/user';
import { DatabaseProvider } from './../../providers/database/database';
import { Job } from './../../interfaces/job';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User, auth } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-job-invite',
  templateUrl: 'job-invite.html'
})
export class JobInvitePage {
  jobDetail: Job;
  employer: UserInterface
  dateTime: string;
  is_view: boolean;

  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DatabaseProvider,
    private angularFireDB: AngularFireDatabase,
    private auth: AuthProvider,
    private dialog: Dialog
    ) {
  }

  ionViewWillLoad() {
    this.jobDetail = this.navParams.data.job;
    this.is_view = this.navParams.data.view === true || false;
    this.formatDate();
    this.db.getEmployerByID<UserInterface>(this.jobDetail.employerID).subscribe((res: UserInterface) =>{
      console.log(res);
      this.employer = res;
    })
  }

  formatDate(){
    let date = new Date(this.jobDetail.timestamp);
    this.dateTime = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() +':'+date.getMinutes();
  }

  aceptJob(){
    this.dialog.showLoading()
    this.angularFireDB.list("/jobs", (ref) =>
    ref.orderByChild('employerID').equalTo(this.jobDetail.employerID)
    ).snapshotChanges(['child_added']).subscribe(res => {
      console.log('JOBS', res)
      res.forEach(j => {
        if(j.payload.val()['hasAccepted'] == false && j.payload.val()['timestamp'] == this.jobDetail.timestamp && j.payload.val()['category'].id == this.jobDetail.category.id){
          this.jobDetail.hasAccepted = true;
          this.auth.getUser().subscribe((user) => {
            console.log(user)
            this.db.getUserByID<UserInterface>(user.uid).subscribe((userData: UserInterface) =>{
              this.jobDetail.employee = userData;
              this.db.updateJob(j.key, this.jobDetail).then(res =>{
                this.dialog.hideLoading()
                this.declineJob()
              }).catch(e => {
                this.dialog.presentAlert(e);
                console.log(e);
              });
            })
          })
        }
      })
    });
  }

  declineJob(){
    if (this.is_view) {
      this.navCtrl.popToRoot();
    }else{
      this.viewCtrl.dismiss()
    }
  }

}
