import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  private url: string;
  public user: any;
  public token: any;

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    this.url = `http://${environment.mode.production}:8000/api`;
  }

  signUp(user: User): Observable<any> {
    const json = JSON.stringify(user);
    const params = `json=${json}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.url}/sign-up`, params, { headers });
  }

  signIn(user: any, getToken: boolean = false): Observable<any> {
    if (getToken) {
      user.getToken = 'true';
    }

    const json = JSON.stringify(user);
    const params = `json=${json}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.url}/sign-in`, params, { headers });
  }

  callbackService(service: string, token: any): Observable<any> {
    return this.http.get(`${this.url}/login/${service}/callback?token=${token}`);
  }

   getUser() {
    this.user = JSON.parse(localStorage.getItem('auth-user'));

    if (this.user !== null) {
      return this.user;
    }else{
      return null;
    }
  }

   getToken() {
    this.token = localStorage.getItem('auth-token');

    if (this.token !== null) {
      return this.token;
    }else{
      return null;
    }
  }

  async logout() {
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
    this.route.navigateByUrl('/login');
  }
}
