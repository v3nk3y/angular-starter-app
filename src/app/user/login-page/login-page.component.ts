import { Component } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loggedInUserProfile: any;

  constructor(public authService: AuthService) {}

  loginWithGoogle() {
    this.authService.GoogleAuth();
  }

}
