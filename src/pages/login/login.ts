import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private form: FormGroup

  constructor(
    private api: ApiProvider,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) {
    if (this.storage.getUser()) {
      this.navCtrl.setRoot('HomePage')
    }
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      zipcode: [{value: '', disabled: true}],
    })
  }

  login(){
    this.functions.loading()
    let data = this.form.value
    this.api.post('login', data).then(data => {
      this.storage.setUser(data)
      this.functions.loader.dismiss()
      this.functions.message('Connected!')
      this.navCtrl.setRoot('HomePage');
    }).catch(() => this.functions.loader.dismiss());
  }

  register(){
    this.navCtrl.push('CadastroClientePage');
  }
}
