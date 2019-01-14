import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private angularFireAuth: AngularFireAuth) { }

  initAuth() {
    this.angularFireAuth.authState.subscribe(user => {
      if(user) {

      }
      else {

      }
    })
  }

  registerUser() {
    this.angularFireAuth.auth
        .createUserWithEmailAndPassword('b.arunselvakumar@gmail.com', 'helloworld')
        .then(result => {
          this.authenticatedSuccess();
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }

  signInUser() {
    console.log('error');

    this.angularFireAuth.auth
      .signInWithEmailAndPassword('b.arunselvakumar@gmail.com', 'hi')
      .then(result => {
        this.authenticatedSuccess();
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logOutUser() {
    this.angularFireAuth.auth.signOut();
    this.isAuthenticated = false;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  authenticatedSuccess() {
    this.isAuthenticated = true;
  }
}
