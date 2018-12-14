import { Job } from './../../interfaces/job';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Dialog } from '../../providers/dialog/dialog';
import { DatabaseProvider } from '../../providers/database/database';
import { Category } from '../../interfaces/category';
import { User } from 'firebase';
import { UserInterface } from '../../interfaces/user';

@IonicPage()
@Component({
  selector: 'page-search-jobs-list',
  templateUrl: 'search-jobs-list.html',
})
export class SearchJobsListPage {

  usuario: UserInterface;
  jobs: Job[] = [];
  category: Category;

  constructor(
    private navParams: NavParams,
    private dialog: Dialog,
    private database: DatabaseProvider,
    private modaCtrl: ModalController,
    private auth: AuthProvider
  ) {
    this.category = navParams.data;
    console.log(this.category);
    this.fetchJobs();
  }
  private fetchJobs(): void {
    this.database.getJobsByCategory<Job>(this.category.id).subscribe((jobs: any) => {
      jobs.forEach((j: Job)=>{
        if(j.employee.ssn != ''){
          this.database.getUserBySSN<UserInterface>(j.employee.ssn).subscribe((res: UserInterface[]) =>{
            if(res && res.length >= 0){
              console.log(j.employee, res)
              j.employee.urlPhoto = res[0].urlPhoto ? res[0].urlPhoto : ''
            }
          })
        }
      });
      this.jobs = jobs;
      console.log(this.jobs);
    });
    this.auth.getUser().subscribe((user) => {
      if(user){
        this.database.getUserByID<UserInterface>(user.uid).subscribe((userData) => {
          this.usuario = userData;
        });
      }
    });
  }

  onVerDatalhes(job){
    if(this.usuario.type === 'employee' && !job.hasAccepted){
      this.modaCtrl.create('JobInvitePage', {job: job, view: false}).present();
    }else{
      this.modaCtrl.create("MyJobContentPage", { job: job , view : 'false'}).present();
    }
  }
}
