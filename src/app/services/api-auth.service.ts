import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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
    private nativeStorage: NativeStorage
  ) {
    this.url = `http://${environment.mode.local}:8000/api`;
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

  callbackService(service: string): Observable<any> {
    return this.http.get(`${this.url}/login/${service}/callback`);
  }

  getUser(): any {
    this.nativeStorage.getItem('auth-user')
    .then(
      data => this.user = data,
      error => console.error(error)
    );

    if (this.user !== null) {
      return this.user;
    } else {
      return null;
    }

  }

  getToken(): any {
    this.nativeStorage.getItem('auth-token')
    .then(
      data => this.token = data,
      error => console.error(error)
    );

    if (this.token !== null) {
      return this.token;
    } else {
      return null;
    }
  }
}
