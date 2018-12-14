import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectEmployeePage } from './select-employee';

@NgModule({
  declarations: [
    SelectEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectEmployeePage),
  ],
})
export class SelectEmployeePageModule {}
