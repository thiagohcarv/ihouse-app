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

  }

  save(){
    this.functions.loading()
    const data = this.form.value
    this.api.post('register', data).then(data => {
      this.storage.setUser(data)
      this.functions.loader.dismiss()
      this.functions.message("Success! Registration salved!");
      this.navCtrl.setRoot('HomePage');
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
