import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  private form: FormGroup
  private thumb: string
  private is_logged: boolean = false

  constructor(
    private api: ApiProvider,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {validator: this.checkPasswords})
  }

  ionViewDidLoad() {
    if (this.storage.getUser()) {
      this.is_logged = true
      this.functions.loading()
      this.api.get('user').then((data: any) => {
        if (data.thumb) {
          this.thumb = 'data:image/png;base64,'+data.thumb
        }
        this.form.get('name').setValue(data.name)
        this.form.get('email').setValue(data.email)
        this.form.get('address').setValue(data.address)
        this.form.get('phone').setValue(data.phone)

        this.form.get('password').clearValidators()
        this.form.get('password').updateValueAndValidity()

        this.form.get('confirm_password').clearValidators()
        this.form.get('confirm_password').updateValueAndValidity()

        this.functions.loader.dismiss()
      }).catch(() => this.functions.loader.dismiss())
    }
  }

  register(){
    this.functions.loading()
    const data = this.form.value
    this.api.post('register', data).then(data => {
      this.storage.setUser(data)
      this.functions.loader.dismiss()
      this.functions.message("Success! Registration salved!");
      this.navCtrl.setRoot('HomePage');
    }).catch(() => this.functions.loader.dismiss())
  }

  save(){
    this.functions.loading()
    const data = this.form.value
    delete data.password
    delete data.confirm_password
    this.api.put('user/update', data).then(res => {

      let user = this.storage.getUser()
      user.user.name = data.name
      user.user.thumb = this.thumb
      this.storage.setUser(user)

      this.functions.loader.dismiss()
      this.functions.message("Success! Update salved!");
      this.navCtrl.pop();
    }).catch(() => this.functions.loader.dismiss())
  }

  checkPasswords(AC: AbstractControl){
    const password = AC.get('password').value
    const confirm_password = AC.get('confirm_password').value
    if(password != confirm_password) {
      AC.get('confirm_password').setErrors( { checkPasswords: true } )
    } else {
      AC.get('confirm_password').setErrors(null);
    }
  }
}
