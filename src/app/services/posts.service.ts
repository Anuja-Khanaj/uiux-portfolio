import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs:AngularFirestore) { }
  

  loadFetured(){
    return this.afs.collection('posts',ref=>ref.where('isFeatured','==',true).limit(4)).snapshotChanges().pipe(map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{data,id}
        })
    }))
  }

  loadLatest(){
    return this.afs.collection('posts',ref=>ref.orderBy('createdAt').limit(4)).snapshotChanges().pipe(map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{data,id}
        })
    }))
  }

  loadSingleCategory(categoryId) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
}