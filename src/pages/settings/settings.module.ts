import { Camera } from '@ionic-native/camera';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { MaskDirectiveModule } from '../../directives/mask/mask';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    MaskDirectiveModule,
    IonicPageModule.forChild(SettingsPage),
  ],
  providers: [Camera]
})
export class SettingsPageModule { }
