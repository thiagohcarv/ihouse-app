import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { PayPal } from '@ionic-native/paypal';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule, FirebaseOptions } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Base64 } from '@ionic-native/base64';

import { MyApp } from './app.component';

import { PaypalProvider } from '../providers/paypal/paypal';
import { Dialog } from './../providers/dialog/dialog';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';


const FIREBASE_OPTIONS: FirebaseOptions = {
  apiKey: "AIzaSyBWFR82-NDK2Ug3IMv8PAblLsORcOSCl94",
  authDomain: "ihouse-8ddbe.firebaseapp.com",
  databaseURL: "https://ihouse-8ddbe.firebaseio.com",
  projectId: "ihouse-8ddbe",
  storageBucket: "ihouse-8ddbe.appspot.com",
  messagingSenderId: "720602884263"
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    IonicStorageModule.forRoot({
      name: 'ihouseservice',
      driverOrder: ['sqlite', 'websql', 'indexeddb']
    }),
    AngularFireModule.initializeApp(FIREBASE_OPTIONS),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ScreenOrientation,
    Dialog,
    PaypalProvider,
    PayPal,
    AuthProvider,
    HttpClientModule,
    DatabaseProvider,
    Base64,
    Device
  ]
})
export class AppModule { }
