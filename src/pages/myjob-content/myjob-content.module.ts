import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyJobContentPage } from './myjob-content';

@NgModule({
  declarations: [MyJobContentPage],
  imports: [IonicPageModule.forChild(MyJobContentPage)],
  providers: [Camera, File]
})
export class MyJobContentPageModule { }
