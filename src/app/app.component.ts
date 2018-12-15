import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AuthProvider } from '../providers/auth/auth';
import { DomSanitizer } from '../../node_modules/@angular/platform-browser';
import { UserInterface } from './../interfaces/user';
import { Dialog } from './../providers/dialog/dialog';
import { Category } from './../interfaces/category';
import { DatabaseProvider } from './../providers/database/database';
import { Device } from '@ionic-native/device'
import { TranslateService } from '@ngx-translate/core';
// import { ThrowStmt } from '@angular/compiler';
import {Storage } from '@ionic/storage';

export interface PageInterface {
  icon: string;
  title: string;
  component: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  language: string;
  rootPage: string;
  isAutorized: boolean;
  photo: any;

  pages: PageInterface[] = [
    { icon: "home", title: 'HOME', component: 'HomePage' },
    { icon: "create", title: 'OFFER_JOB', component: 'JobCategoryPage' },
    { icon: "search", title: 'SEARCH_JOB', component: 'SearchJobsPage' },
    { icon: "person", title: 'MY_JOBS', component: 'MyjobsListPage' },
    { icon: "mail", title: 'MESSAGES', component: 'MessagesPage' },
    { icon: "settings", title: 'SETTINGS', component: 'SettingsPage' }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    screen: ScreenOrientation,
    private database: DatabaseProvider,
    private auth: AuthProvider,
    public dialog: Dialog,
    public sanitizer: DomSanitizer,
    private device: Device,
    private config: Config,
    private translate: TranslateService,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      this.initTranslate();
      if (platform.is('cordova')) {
        statusBar.styleDefault();
        statusBar.backgroundColorByHexString('#0abab5');
        splashScreen.hide();
        screen.lock(screen.ORIENTATIONS.PORTRAIT);
      }
      auth.getUser().subscribe((user) => {
        if (user && user.emailVerified) {
          console.log(user);
          this.database.getUserByID<UserInterface>(user.uid).subscribe((userData) => {
            this.photo = !!userData.urlPhoto ? this.sanitizer.bypassSecurityTrustResourceUrl(userData.urlPhoto) : 'assets/icon/photo.svg';
            console.log(user);
            this.storage.set('isAutorized', userData.isAutorized ? 'true' : 'false');
            this.isAutorized = userData.isAutorized;
          });

          this.database.updateUser(user.uid, {
            uuid: this.device.uuid
          })

          this.rootPage = "HomePage";
        } else {
          this.rootPage = "LoginPage";
        }
      }, () => this.rootPage = "LoginPage");
    });
  }

  private initTranslate(): void {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang !== 'pt-BR' && browserLang !== 'en') {
        this.translate.use('en');
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }
    this.language = this.translate.currentLang;
  }

  openPage(page: PageInterface): void {
    if (page.component === "SearchJobsPage") {
      this.database.getCategories<Category>().subscribe((categories) => {
        this.nav.push('SearchJobsPage', { categories: categories });
      }, (err) => this.dialog.presentAlert(err.message));
    } else if (page.component === "HomePage") {
      //this.nav.setRoot(page.component);
      this.nav.popToRoot();
    } else {
      this.nav.push(page.component);
    }
  }

  onLogout(): void {
    this.nav.setRoot('LoginPage').then(() => {
      this.auth.logout();
    });
  }

  changeLanguage(): void {
    this.translate.use(this.language);
  }
}
