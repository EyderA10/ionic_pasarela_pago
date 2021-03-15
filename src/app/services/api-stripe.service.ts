import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiStripeService {
  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = 'http://localhost:8000/api/paymount';
  }

  makeRequestToApiStripe(token: any): Observable<any> {
    return this.http.get(`${this.url}/${token}`);
  }
}
