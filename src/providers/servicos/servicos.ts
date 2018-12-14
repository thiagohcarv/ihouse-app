import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServicosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicosProvider {

  constructor(private http: HttpClient) { }

  getListServices():Promise<any>{
    return this.http.get<any>("assets/mock/mockServicos.json").toPromise();
  }

  getListMyJobs():Promise<any>{
    return this.http.get<any>("assets/mock/mockMyJobs.json").toPromise();
  }

  getListCategoreServices():Promise<any>{
    return this.http.get<any>("assets/mock/mockCategorias.json").toPromise();
  }

}
