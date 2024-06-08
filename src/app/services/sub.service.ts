// sub.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sub } from '../models/sub';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private afs: AngularFirestore) { }

  addSubs(subData: Sub): Promise<void> {
    return this.afs.collection('subscribers').add(subData).then(() => {
      console.log('Subscriber Saved Successfully');
    }).catch(error => {
      console.error('Error saving subscriber: ', error);
      throw error; // Propagate the error
    });
  }

  checkSubs(email: string): Observable<any> {
    return this.afs.collection('subscribers', ref => ref.where('email', '==', email)).get();
  }
}
