import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPage } from './messages';

@NgModule({
  declarations: [MessagesPage],
  imports: [
    IonicPageModule.forChild(MessagesPage),
    TranslateModule.forChild()
  ]
})
export class MensagensPageModule { }
