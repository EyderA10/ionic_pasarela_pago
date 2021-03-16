import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiStripeService } from './../services/api-stripe.service';

declare var paypal;
declare var Stripe;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public stripe = Stripe(environment.apiKeyStripe);
  public card: any;
  public icon: string;
  public paymount: number;
  public currency: string;
  public paypalConfig: any;

  constructor(
    private apiStripe: ApiStripeService
  ) {
    this.icon = '$';
    this.paymount = 10;
    this.currency = 'USD';
    this.paypalButton();
  }

  ngOnInit(): void {
    this.payWithStripe();
  }

  private payWithStripe() {
    const elements = this.stripe.elements(); // guardo metodo para crear elementos
    const style = { // estilos del elemento
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style }); // creo la tarjeta
    // console.log(this.card);
    this.card.mount('#card-element');

    // si existen errores que me los muestre
    this.card.addEventListener('change', (event: any) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      this.stripe.createToken(this.card).then((result: any) => {
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // envio el token al servidor
          console.log('stripe-client:', result);
          this.stripeTokenHandler(result.token);
        }
      });
    });
  }

  private stripeTokenHandler(token: any) {
    this.apiStripe.makeRequestToApiStripe(token.id).subscribe(
      response => {
        console.log('stripe-api', response);
      },
      error => {
        console.log(error);
      }
    );
  }

  private paypalButton() {
    const { paypal: { mode } } = environment;
    paypal.Button.render({
      env: mode.sandbox, // o production
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'pill',
        label: 'checkout',
        tagline: 'true'
      },
      // procesos de pago
      payment: (data: any, actions: any) => {
        // peticion a la api
        return actions.request.post('http://localhost:8000/api/paypal/create-payment')
          .then((res: any) => {
            // returna res.id
            console.log('payment:', res, res.id);
            return res.id;
          });
      },
      // checkout del pago
      onAuthorize: (data: any, actions: any) => {
        return actions.request.post('http://localhost:8000/api/paypal/checkout', {
          paymentID: data.paymentID,
          payerID:   data.payerID
        })
          .then((res: any) =>  {
            console.log('authorizase:', res);
            alert('EL PAGO HA PASADO CON EXITO!!');
          });
      }
    }, '#paypal-button');
  }
}
