import { Job } from './../../interfaces/job';
import { UserInterface } from './../../interfaces/user';
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
  public userID: string;

  constructor(
    private navCtrl: NavController,
    private auth: AuthProvider,
    private dataBase: DatabaseProvider,
    private dialog: Dialog,
    private database: DatabaseProvider,
    private navParams: NavParams,
    private storage: Storage
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
        this.userData = this.navParams.data;
        this.userID = user.uid;
        if(this.userData == null){
          this.database.getUserByID<UserInterface>(user.uid).subscribe((userData) => {
            this.userData = userData;
          });
        }
        console.log("USER", this.userData);
        this.load(this.userData);
      }
    });
  }

  load(userData: UserInterface){
    if(userData.type === 'employee'){
      if(userData.skills){
        userData.skills.forEach(e =>{
          this.dataBase.getJobsByCategory<Job>(e.id).subscribe((job) => {
            if(job){
              job.forEach(j => {
                console.log("JOB HOME", j);
                if(!j.employee.name)
                  this.dialog.presentConfirmInvite('New job for you!', j.category.name, ()=> {
                    this.navCtrl.push('JobInvitePage', {job: j});
                  });
              })
            }
          })
        })
      }
    }
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
