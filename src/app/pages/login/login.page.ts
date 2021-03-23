import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ApiAuthService } from '../../services/api-auth.service';
import { User } from '../../models/User';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User;

  constructor(
    private apiAuth: ApiAuthService,
    private router: Router,
    private fb: Facebook,
    private googlePlus: GooglePlus
  ) {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
  }

  handleLogin(form: any) {
    console.log(this.user);
  }

  handleLoginWithGoogle() {
    this.googlePlus.login({})
      .then((res) => {

        console.log(res);
        if (res.token) {
          this.apiAuth.callbackService('google').subscribe(
            response => {
              console.log('google', response);
            },
            err => {
              console.log('err-google', err);
            }
          );
        }
      }
      )
      .catch(err => console.log(err));
  }

  handleLoginWithFacebook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log(res);
        if (res.status === 'connected') {
          this.apiAuth.callbackService('facebook').subscribe(
            response => {
             console.log(response);
            }, err => {
              console.log(err);
            });
          } else {
          console.log(res);
        }
      });
  }
}
