import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable()
export class AuthProvider {

  private urlPostImg: string = 'http://www.continuumweb.com.br/projetos/ihouse/uploadImg.php';

  constructor(private afAuth: AngularFireAuth, private afStorage: AngularFireStorage, private http: HttpClient) { }

  login(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  register(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  
  updatePassword(password: string): Promise<void> {
    return this.afAuth.auth.currentUser.updatePassword(password);
  }

  updateProfile(displayName: string, photoURL: string): Promise<void> {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    })
  }

  // uploadPhoto(path: string, imageData: any): AngularFireUploadTask {
  //   return this.afStorage.upload(path, imageData);
  // }

  uploadPhoto(imageData: any):Promise<any>{
    const dataImg = new FormData();
    dataImg.append('img', imageData);
    return this.http.post(this.urlPostImg, dataImg).toPromise().then(res=>{
      console.log(res);
      return res ? res : false;
    }).catch(err=>{
      console.log(err);
      return;
    });

  }

  getPhoto(path: string): Observable<any> {
    const ref = this.afStorage.ref(path);
    return ref.getDownloadURL();
  }

  resetPassword(email: string): void {
    this.afAuth.auth.sendPasswordResetEmail(email);
  }

  getUser(): Observable<firebase.User> {
    return this.afAuth.user;
  }
}
