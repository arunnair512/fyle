import { Injectable } from '@angular/core'; 

import { Storage } from '@ionic/storage';
 
@Injectable() 
export class StorageProvider { 
 
  constructor(private storage: Storage) { } 
 
  get(key: string) { 
    return this.storage.get(key).then(value => JSON.parse(value));
  }
  set(key: string, value: any){
    this.storage.set(key, JSON.stringify(value));
  } 
 
}