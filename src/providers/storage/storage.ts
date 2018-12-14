import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

	constructor() { }

  // USER
	setUser(data){
		localStorage.setItem('user', JSON.stringify(data));
	}

	getUser(){
		return JSON.parse(localStorage.getItem('user'));
	}

  removeUser(){
    localStorage.removeItem('user')
  }
}