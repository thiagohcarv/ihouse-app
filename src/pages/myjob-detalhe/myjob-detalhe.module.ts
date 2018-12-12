import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyJobDetalhePage } from './myjob-detalhe';

@NgModule({
  declarations: [
    MyJobDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(MyJobDetalhePage),
  ],
})
export class MyjobDetalhePageModule {}
