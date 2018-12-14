import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { StorageProvider } from '../providers/storage/storage';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private thumb: string
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private storage: StorageProvider,
    private screen: ScreenOrientation,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Offer Job', component: 'CategoriaServicosPage' },
      { title: 'Search Job', component: 'SearchJobsCatPage' },
      { title: 'My Jobs', component: 'MyjobsPage' },
      { title: 'Messages', component: 'MensagensPage' },
      { title: 'Settings', component: 'CadastroClientePage' }
    ];

    if(this.storage.getUser()){
      this.thumb = this.storage.getUser().user.thumb
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString('#0abab5');
        this.splashScreen.hide();
      }
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  onLogout(){
    this.menuCtrl.close();
    this.storage.removeUser();
    this.nav.setRoot(LoginPage);
  }
}
