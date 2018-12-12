import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaServicosPage } from './categoria-servicos';

@NgModule({
  declarations: [
    CategoriaServicosPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaServicosPage),
  ],
})
export class CategoriaServicosPageModule {}
