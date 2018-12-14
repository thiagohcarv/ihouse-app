import { App } from "ionic-angular";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LoginPage } from '../../pages/login/login';
import { StorageProvider } from '../storage/storage';
import { FunctionsProvider } from '../functions/functions';

@Injectable()
export class ApiProvider {

  private api = 'http://127.0.0.1:8000/api/v1/'

  constructor(
    private app: App,
    private http: HttpClient,
    private storage: StorageProvider,
    private functions: FunctionsProvider
  ) { }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders(),
        params: new HttpParams()
      }
    }

    if (params) {
      reqOpts.params = new HttpParams()
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k])
      }
    }

    return new Promise((resolve, reject) => {
      this.http.get(this.api + endpoint + '/', reqOpts)
        .subscribe(res => {
          resolve(res)
        }, err => {
          this.showErrors(err)
          reject(err)
        })
    })
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders()
      }
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.api + endpoint + '/', body, reqOpts)
        .subscribe(res => {
          resolve(res)
        }, err => {
          this.showErrors(err)
          reject(err)
        })
    })
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders()
      }
    }

    return new Promise((resolve, reject) => {
      this.http.put(this.api + endpoint + '/', body, reqOpts)
        .subscribe(res => {
          resolve(res)
        }, err => {
          this.showErrors(err)
          reject(err)
        })
    })
  }

  delete(endpoint: string, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders()
      }
    }

    return new Promise((resolve, reject) => {
      this.http.delete(this.api + endpoint + '/', reqOpts)
        .subscribe(res => {
          resolve(res)
        }, err => {
          this.showErrors(err)
          reject(err)
        })
    })
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        headers: this.getHeaders()
      }
    }

    return new Promise((resolve, reject) => {
      this.http.patch(this.api + endpoint + '/', body, reqOpts)
        .subscribe(res => {
          resolve(res)
        }, err => {
          this.showErrors(err)
          reject(err)
        })
    })
  }

  getHeaders(){
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    if (this.storage.getUser()) {
      httpHeaders = httpHeaders.append('Authorization', 'basic '+this.storage.getUser().token)
    }
    return httpHeaders
  }

  showErrors(err){
    if (err.status == 401) {
      this.disconect()
    }else{
      if (err.error && err.error.errors) {
        let errors = err.error.errors
        for (let key in errors){
          errors[key].forEach(message => {
            this.functions.message(message)
          })
        }
      }else{
        this.functions.message('Oops! Ocorreu algum erro.')
      }
    }
  }

  disconect(){
    setTimeout(() =>{
      if (this.functions.loader) {
        this.functions.loader.dismiss()
      }
    }, 500)
    this.storage.removeUser()
    this.app.getActiveNav().setRoot(LoginPage);
    this.functions.message('User disconnected!')
  }
}
