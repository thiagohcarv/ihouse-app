import { HomePageModule } from '../home/home.module';
import { CadastroClientePageModule } from '../cadastro-cliente/cadastro-cliente.module';


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    CadastroClientePageModule,
    HomePageModule
  ],
})
export class LoginPageModule {}
