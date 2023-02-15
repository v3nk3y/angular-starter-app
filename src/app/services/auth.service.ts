import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './user.model';
// import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public afStore: AngularFirestore, // Inject Firestore service
    ) { 
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    }
    

  // Sign in with google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
      if(res) {
        console.log('USer Logged in - navigate to dashboard');
      }
    });
  }

  // Auth Login to run auth providers
  AuthLogin(provider: GoogleAuthProvider){
    return this.afAuth.signInWithPopup(provider)
      .then((response) => {
        console.log(response);
        this.SetUserData(response.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

   /* Set user data with social(google) auth provider in Firestore DB - AngularFirestore, AngularFirestoreDocument */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
