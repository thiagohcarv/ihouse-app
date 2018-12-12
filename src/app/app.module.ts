import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPageModule } from './../pages/login/login.module';
import { ServicosProvider } from './../providers/servicos/servicos';
import { MensagensProvider } from './../providers/mensagens/mensagens';
import { DialogoProvider } from './../providers/dialogo/dialogo';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DialogoProvider,
    UsuarioProvider,
    MensagensProvider,
    ServicosProvider,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
