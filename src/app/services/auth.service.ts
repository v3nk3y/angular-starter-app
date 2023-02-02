import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  // Sign in with google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider);
  }

  // Auth Login to run auth providers
  AuthLogin(provider: GoogleAuthProvider){
    return this.afAuth.signInWithPopup(provider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
