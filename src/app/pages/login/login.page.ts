import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ApiAuthService } from '../../services/api-auth.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User;
  public resFb: any;
  public resGg: any;
  public resApi: any;

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
      .then(res => this.resGg = JSON.stringify(res))
      .catch(err => this.resGg = `Error ${JSON.stringify(err)}`);
  }

  handleLoginWithFacebook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.resFb = JSON.stringify(res);
        if (res.status === 'connected') {
          this.apiAuth.callbackService('facebook').subscribe(
            response => {
              this.resApi = JSON.stringify(response);
            }, err => {
              this.resApi = JSON.stringify(err);
            });
          } else {
          this.resFb = JSON.stringify(res);
        }
      });
  }
}
