import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ApiAuthService } from '../../services/api-auth.service';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/User';
import { Router } from '@angular/router';
import validator from 'validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User;
  public token: string;
  public getAvatar: any;

  constructor(
    private apiAuth: ApiAuthService,
    private router: Router,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private http: HttpClient
  ) {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
  }

  handleLogin(form: any) {
    const errss = this.formValid();

    if (errss.length === 0) {
      this.apiAuth.signIn(this.user).subscribe(
        response => {

          if (response.status === 'success') {
            this.token = response.token;
            this.apiAuth.signIn(this.user, true).subscribe(
              response => {

                localStorage.setItem('auth-token', this.token);
                localStorage.setItem('auth-user', JSON.stringify(response.token));
                this.router.navigateByUrl('/user');
              },
              error => {
                console.log(error);
              }
            );
          }
        },
        error => {
          alert('Lo sentimos pero estos credenciales no coinciden con los que tenemos guardados');
          console.log(error);
        }
      );
    } else {
      errss.forEach((errr: string) => {
        alert(errr);
      });
    }
  }

  handleLoginWithGoogle() {
    this.googlePlus.login({})
      .then((res) => {
        if (res.token) {
          this.http.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res.token}`)
          .subscribe(
            response => {
              console.log('google_res', response);
              this.apiAuth.saveUserService(response).subscribe(
                response => {
                  console.log('api-response', response);
                },
                err => {
                  console.log(err);
                }
              );
            },
            err => {
              console.log(err);
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
      });
  }

  private formValid(): Array<string> {
    const { email, password } = this.user;
    const errors: any = [];

    if (!validator.isEmail(email) || email.trim().length === 0) {
      errors.push(`Este email ${email} es invalido o debe ser requerido!!`);
    }

    if (password.length > 10) {
      errors.push('la contraseña debe ser menor o igual a 10 caracteres!!');
    }

    return errors;
  }
}
