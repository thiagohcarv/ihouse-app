import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import { FunctionsProvider } from '../../providers/functions/functions';

@IonicPage()
@Component({
  selector: 'page-message-form',
  templateUrl: 'message-form.html',
})
export class MessageFormPage {

  private form: FormGroup
  private job_id: number

  constructor(
    private api: ApiProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
    this.job_id = this.navParams.data.job_id
  }

  save(){
    this.functions.loading()
    const data = this.form.value
    data.job = this.job_id
    this.api.post('message', data).then(data => {
      this.functions.loader.dismiss()
      this.functions.message("Success! Message sended!");
      this.navCtrl.pop();
    }).catch(() => this.functions.loader.dismiss())
  }
}
