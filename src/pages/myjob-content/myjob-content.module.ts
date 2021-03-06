import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyJobContentPage } from './myjob-content';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Diagnostic } from '@ionic-native/diagnostic';

@NgModule({
  declarations: [MyJobContentPage],
  imports: [IonicPageModule.forChild(MyJobContentPage)],
  providers: [Camera, File, Geolocation, SocialSharing, Diagnostic]
})
export class MyJobContentPageModule { }
