import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value:User){
    // value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

  // searchUsers(searchValue){
  //   return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
  //     .where('nameToSearch', '<=', searchValue + '\uf8ff'))
  //     .snapshotChanges()
  // }

  // searchUsersByAge(value){
  //   return this.db.collection('users',ref => ref.orderBy('email').startAt(value)).snapshotChanges();
  // }


  createUser(value:User){
    return this.db.collection('users').add({
      firstname: value.firstname,
      lastname: value.lastname,
      email: value.email,
      noticeC: value.noticeC,
      noticeE: value.noticeE,
      noticeD: value.noticeD,
      postC: value.postC,
      postE: value.postE,
      postD: value.postD,
      alertC: value.alertC,
      alertE: value.alertE,
      alertD: value.alertD,
    });
  }
}
