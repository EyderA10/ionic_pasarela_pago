import { Component } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';
import { Card, Window } from '../interfaces/card';
import { ApiStripeService } from './../services/api-stripe.service';

declare var window: Window;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public card: Card;
  public icon: string;
  public paymount: number;
  public currency: string;
  public paypalConfig: any;

  constructor(
    private stripe: Stripe,
    private apiStripe: ApiStripeService
  ) {
    this.icon = '$';
    this.paymount = 10;
    this.currency = 'USD';
    this.paypalButton();
  }

  payWithStripe() {
    this.card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
    };
    this.stripe.setPublishableKey(environment.apiKeyStripe);
    this.stripe.createCardToken(this.card).then((token) => {
      this.apiStripe.makeRequestToApiStripe(token.id).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    })
      .catch(error => console.log(error));
  }

  paypalButton() {
    // Render the PayPal button into #paypal-button-container
    window['paypal'].Buttons({
      env: 'sandbox',
      payment: (data: any, actions: any) => {
        console.log(data);
        console.log(actions);
      }
    }).render('#paypal-button-container');
  }
}
