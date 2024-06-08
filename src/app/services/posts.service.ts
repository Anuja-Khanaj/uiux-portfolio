import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import * as firebase from '@angular/fire'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }


  loadFetured() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { data, id }
      })
    }))
  }

  loadLatest() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { data, id }
      })
    }))
  }

  loadSingleCategory(category: any) {
    return this.afs.collection('posts', ref => 
      ref.where('category.category', '==', category)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
      
        
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  loadOnePost(postId){
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilar(cat){
    return this.afs.collection('posts', ref => 
      ref.where('category.category', '==', cat)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
      
        
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  // countViews( postId) {
  //   const viewsCount = {
  //           views: firebase.default.firestore. FieldValue.increment (1)
  //   }
  //   this.afs.doc('posts/${postId}').update(viewsCount).then(() => {
  //       console.log('Views Count Updated ..!');
  //   });
  // }
}
