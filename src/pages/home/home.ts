import { DatePipe } from '@angular/common';
import { Job } from './../../interfaces/job';
import { UserInterface } from './../../interfaces/user';
import { Message } from './../../interfaces/message';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Category } from '../../interfaces/category';
import { DatabaseProvider } from '../../providers/database/database';
import { Dialog } from '../../providers/dialog/dialog';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public name: string = "";
  public isAutorized: string;
  public userData: UserInterface;
  public message: Message;
  public userID: string;

  constructor(
    private navCtrl: NavController,
    private auth: AuthProvider,
    private dataBase: DatabaseProvider,
    private dialog: Dialog,
    private database: DatabaseProvider,
    private navParams: NavParams,
    private storage: Storage,
    private datepipe: DatePipe
  ) {
    this.loadData()
  }

  ionViewWillEnter(){
    this.storage.get('isAutorized').then((val)=>{
      this.isAutorized = val;
    });
  }

  async loadData(){
    this.auth.getUser().subscribe((user) => {
      if(user){
        this.name = user.displayName || "";
        this.userID = user.uid;
        if (this.navParams.data.id) {
          this.userData = this.navParams.data;
          this.load(this.userData);
        }else{
          this.database.getUserByID<UserInterface>(user.uid).subscribe((userData) => {
            this.userData = userData;
            this.load(this.userData);
          }, err=> console.log(err));
        }
      }
    });
  }

  async load(userData: UserInterface){
    if(userData && userData.type === 'employee'){
      if(userData.skills){
        let job_invite = null
        userData.skills.forEach(e =>{
          this.dataBase.getJobsByCategory<Job>(e.id).subscribe((job) => {
            if(job){
              job.forEach(j => {
                let now = this.datepipe.transform(new Date(), 'yyyy-MM-dd')
                let time = this.datepipe.transform(j.timestamp, 'yyyy-MM-dd')
                if(!j.employee.name){
                  if (!job_invite) {
                    job_invite = true
                    this.createMessage('New job for you!', 'You invited for new job.', j)
                    this.dialog.presentConfirmInvite('New job for you!', j.category.name, ()=> {
                      this.navCtrl.push('JobInvitePage', {job: j});
                    });
                  }
                }else if(j.employee.id == userData.id && time == now){
                  this.createMessage('You have a job today!', 'You have a job accepted for today.', j)
                }
              })
            }
          })
        })
      }
    }
  }

  createMessage(title, message, job=null){
    this.message = {
      user: this.userData,
      title: title,
      body: message,
      job: job,
      visualized: false
    }

    this.database.createMessage(this.message)
  }

  onMensagens(): void {
    this.navCtrl.push('MessagesPage');
  }

  onMyJobs(): void {
    this.navCtrl.push('MyjobsListPage', {userId: this.userID});
  }

  onOfferJobs(): void {
    this.navCtrl.push('JobCategoryPage');
  }

  onSettings(): void {
    this.navCtrl.push('SettingsPage');
  }

  onSearchJobs(): void {
    const me = this;
    this.database.getCategories<Category>().subscribe((categories) => {
      me.navCtrl.push('SearchJobsPage', { categories: categories });
    }, (err) => me.dialog.presentAlert(err.message));
  }
}
