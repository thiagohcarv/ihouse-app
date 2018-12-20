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

  load(userData: UserInterface){
    if(userData && userData.type === 'employee'){
      if(userData.skills){
        userData.skills.forEach(e =>{
          this.dataBase.getJobsByCategory<Job>(e.id).subscribe((job) => {
            if(job){
              job.forEach(j => {
                if(!j.employee.name)
                  var id = 0
                  this.database.getMessages(userData.id).subscribe(val => {
                    if (val.length) {
                      id = val[val.length - 1]['id'] + 1
                    }
                  })
                  if (id) {
                    this.message.id = id || 0
                    this.message.user = userData
                    this.message.title = 'New job for you!'
                    this.message.body = 'You invited for new job.'
                    this.message.job = j

                    this.database.createMessage(this.message)
                    this.dialog.presentConfirmInvite(this.message.title, j.category.name, ()=> {
                      this.navCtrl.push('JobInvitePage', {job: j});
                    });
                  }
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
