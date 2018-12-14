import { Category } from './../../interfaces/category';
import { Base64 } from '@ionic-native/base64';
import { Component } from '@angular/core';
import { IonicPage, NavController, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Dialog } from '../../providers/dialog/dialog';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { UserInterface } from '../../interfaces/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  type: string = "employer";
  name: string = "";
  email: string = "";
  ssn: string = "";
  photo: string = "";
  address: string = "";
  phone: string = "";
  password: string = "";
  passwordConfirm: string = "";
  imgBase64: string = "";
  isAutorized: boolean = false;
  skills: Category[] = [];
  categories: Category[] = [];
  selectOptions;

  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    private dialog: Dialog,
    private auth: AuthProvider,
    private db: DatabaseProvider,
    private base64: Base64
  ) {
    this.selectOptions = {
      title: 'Select your skills',
      subTitle: '',
      mode: 'md'
    };
  }

  ionViewCanEnter(){
    return this.db.getCategories<Category>().subscribe((res) => {
      this.dialog.hideLoading();
      this.categories = res;
      return true;
    }, (err) => {
      console.log(err);
      this.dialog.presentAlert(err.message);
      return false;
    })
  }

  compareFn(e1: Category, e2: Category): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }  

  onRegister(): void {
    if (this.password !== this.passwordConfirm) {
      this.dialog.presentAlert("As senhas não conferem");
      return;
    }
    this.dialog.showLoading();
    this.auth.register(this.email, this.password)
      .then((res) => {
        this.dialog.hideLoading();
        this.createUser(res.user.uid);
      }).catch((err) => {
        this.dialog.presentAlert(err.message);
      })
  }
  openCamera(): void {
    const options: CameraOptions = {
      quality: 100,
      cameraDirection: 1,
      targetHeight: 400,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.photo = "data:image/jpeg;base64," + imageData;  
      this.base64.encodeFile(this.photo).then((imgBase64: string) => {
        console.log("encodeFile", imgBase64);
        this.imgBase64 = imgBase64;
      }).catch(err => {
        console.log("Falha ao converte imagem");
        this.dialog.presentAlert(err);
      });
    }, (err) => {
      this.dialog.presentAlert(err);
    });
  }
  private createUser(id: string): void {
    console.log('Create USER::');
    this.auth.updateProfile(this.name, "").then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
    this.db.createUser<UserInterface>(`user/${id}`, {
      name: this.name,
      phone: this.phone,
      address: this.address,
      type: this.type,
      urlPhoto: this.imgBase64,
      ssn: this.ssn,
      rating: 5,
      uuid: '',
      isAutorized: this.isAutorized,
      skills: this.skills,
      id: id
    });
  }
}