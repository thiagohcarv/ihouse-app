import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobInvitePage } from './job-invite';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [JobInvitePage],
  imports: [
    IonicPageModule.forChild(JobInvitePage),
    TranslateModule.forChild()
  ]
})
export class InvitePageModule { }
