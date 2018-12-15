import { UserInterface } from './../../interfaces/user';
import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Dialog } from './../../providers/dialog/dialog';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ModalController, ViewController, Platform, AlertController } from 'ionic-angular';
import { Job } from '../../interfaces/job';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Diagnostic } from '@ionic-native/diagnostic';

@IonicPage()
@Component({
  selector: 'page-myjob-content',
  templateUrl: 'myjob-content.html',
})
export class MyJobContentPage {
  myJob: Job;
  view: boolean;
  urlPhoto;
  userData: UserInterface;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private base64: Base64,
    private auth: AuthProvider,
    private db: DatabaseProvider,
    private camera: Camera,
    private dialog: Dialog,
    private geolocation: Geolocation,
    private angularFireDB: AngularFireDatabase,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController
  ) {
    this.myJob = navParams.data.job;
    this.view = navParams.data.view == 'false' ? false : true;
    this.userData = navParams.data.user;
    if(!this.userData){
      this.auth.getUser().subscribe(u => {
        this.db.getUserByID(u.uid).subscribe((user: UserInterface)=>{
          this.userData = user
        })
      })
    }
    console.log(this.myJob);
  }

  addPhoto(){
    const options: CameraOptions = {
      quality: 80,
      cameraDirection: 1,
      targetHeight: 400,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let photo = "data:image/jpeg;base64," + imageData;
      this.base64.encodeFile(photo).then((imgBase64: string) => {
        console.log("encodeFile", imgBase64);
        this.myJob.urlPhoto = imgBase64 || photo;
        // this.update();
      }).catch(err => {
        console.log("Falha ao converte imagem");
        this.dialog.presentAlert(err);
      });
    }, (err) => {
      this.dialog.presentAlert(err);
    });
  }

  completeJob(){
    if(!this.myJob.urlPhoto){
      this.dialog.presentAlert('Add a photo of your work!');
      return;
    }else{
      this.myJob.hasCompleted = true;
      this.update();
    }
  }

  pay(){
    console.log('function pay')
  }

  update(){
    this.dialog.showLoading();
    this.angularFireDB.list("/jobs", (ref) =>
    ref.orderByChild('employerID').equalTo(this.myJob.employerID)
    ).snapshotChanges(['child_added']).subscribe(res => {
      console.log('JOBS', res)
      res.forEach(j => {
        if(j.payload.val()['timestamp'] == this.myJob.timestamp && j.payload.val()['category'].id == this.myJob.category.id){
          this.db.updateJob(j.key, this.myJob).then(()=>{
            this.dialog.hideLoading()
            this.navCtrl.popToRoot();
          }).catch((e)=>{
            console.log(e);
            this.dialog.presentAlert('There was an error while trying to finish your work.');
          })
        }
      })
    });
  }

  sendLocalization(){
    if (this.platform.is('cordova')) {
      this.diagnostic.isGpsLocationAvailable().then(data => {
        if (!data) {
          let alert = this.alertCtrl.create({
            title: 'Attention!',
            message: "You need to enable gps to continue.",
            buttons: ['Cancel', {
              text: 'Ok', handler: data => {
                this.diagnostic.switchToLocationSettings()
              }
            }]
          });
          alert.present();
        }else{
          this.dialog.showLoading()
          this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(pos => {
            this.myJob.latitude = pos.coords.latitude
            this.myJob.longitude = pos.coords.longitude
            const lat_long = this.myJob.longitude+','+this.myJob.latitude
            const location = 'https://api.mapbox.com/v4/mapbox.streets-basic/pin-m-circle+E93939('+lat_long+')/'+lat_long+',16/300x300.png?access_token=pk.eyJ1IjoiamhvbmkwOCIsImEiOiJjanBwZDVzMGUwNnlwNDhudjNzb2FjbnB6In0.XpsfZQROikEW4r4SpJsnVA'
            let phone = '+55'+this.myJob.employee.phone
            this.socialSharing.shareViaWhatsApp('', location).then(data=> {
            // this.socialSharing.shareViaWhatsAppToReceiver(phone, '', location, location).then((data) => {
              if (data) {
                this.dialog.hideLoading()
                this.update()
              }
            }).catch((error) => {
              this.dialog.hideLoading()
              console.log('Error share location', error)
              this.dialog.presentAlert('Error sharing location, try again.');
            });
          }).catch((error) => {
            this.dialog.hideLoading()
            console.log('Error getting location', error)
            this.dialog.presentAlert('Error getting location, try again.');
          });
        }
      })
    }
  }

  sendMediation(){
    const subject = 'Mediation'

    this.socialSharing.shareViaEmail('', subject, ['ihouseservice.contato@gmail.com']).then(() => {

    }).catch((error) => {
      console.log('Error share email', error)
      this.dialog.presentAlert('Error sharing email, try again.');
    });
  }

  back(){
    this.viewCtrl.dismiss();
  }


}
