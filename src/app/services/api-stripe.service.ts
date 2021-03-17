import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiStripeService {
  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = 'http://localhost:8000/api';
  }

  makeRequestToApiStripe(tokenId: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(`${this.url}/paymount/${tokenId}`, {headers});
  }


}
