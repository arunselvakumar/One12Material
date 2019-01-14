import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserModel } from '../models/user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.authState;
  }

  registerUser(user: UserModel) {

    this.angularFireAuth.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });

  }

  signInUser(user: UserModel) {

    this.angularFireAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

  }

  logOutUser() {
    this.angularFireAuth.auth.signOut();
  }

}
