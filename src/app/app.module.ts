import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';

import { ApiProvider } from '../providers/api/api';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { DialogoProvider } from '../providers/dialogo/dialogo';
import { StorageProvider } from '../providers/storage/storage';
import { ServicosProvider } from '../providers/servicos/servicos';
import { MensagensProvider } from '../providers/mensagens/mensagens';
import { FunctionsProvider } from '../providers/functions/functions';

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
    ScreenOrientation,

    ApiProvider,
    DialogoProvider,
    UsuarioProvider,
    StorageProvider,
    ServicosProvider,
    MensagensProvider,
    FunctionsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
