import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MensagensProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensagensProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MensagensProvider Provider');
  }

  getListMensagens():Promise<any>{
    return this.http.get("assets/mock/mockMensagens.json").toPromise();
  }

}
