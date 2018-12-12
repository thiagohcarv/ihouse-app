import { UsuarioProvider } from './../providers/usuario/usuario';

import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ScreenOrientation} from '@ionic-native/screen-orientation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menuCtrl: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen, private usuario:UsuarioProvider, private screen:ScreenOrientation) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Offer Job', component: 'CategoriaServicosPage' },
      { title: 'Search Job', component: 'SearchJobsCatPage' },
      { title: 'My Jobs', component: 'MyjobsPage' },
      { title: 'Messages', component: 'MensagensPage' },
      { title: 'Settings', component: 'HomePage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.statusBar.backgroundColorByHexString("#0abab5");
      this.statusBar.backgroundColorByHexString('#0abab5');
      this.splashScreen.hide();
      if(this.platform.is('mobile')){
        this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
      }
      this
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  onLogout(){
    this.menuCtrl.close();
    this.usuario.logout();
    this.nav.setRoot('LoginPage');
  }
}
