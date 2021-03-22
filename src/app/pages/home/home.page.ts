import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiStripeService } from '../../services/api-stripe.service';

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
          // envio el token a la api
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
        alert('EL PAGO HA PASADO CON EXITO!!');
      },
      error => {
        console.log(error);
        alert('HA OCURRIDO UN ERROR AL REALIZAR EL PAGO');
      }
    );
  }

  private paypalButton() {
    const { paypal: { mode } } = environment;
    paypal.Button.render({
      env: mode.sandbox, // o production
      style: {
        size: 'responsive',
        color: 'blue',
        shape: 'pill',
        label: 'checkout',
        tagline: 'true'
      },
      // proceso de pago
      payment: (data: any, actions: any) => {
        // peticion a la api
        const { mode } = environment;
        return actions.request.get(`http://${mode.local}:8000/api/paypal/create-payment`)
        .then((res: any) => {
          console.log('payment:', res, res.id);
          return res.id;
        });
      },
      // ejecucion y checkout del pago
      onAuthorize: (data: any, actions: any) => {
        // peticion a la api
        const { mode } = environment;
        const { paymentID, payerID, paymentToken } = data;
        return actions.request.get(`http://${mode.local}:8000/api/paypal/execute-payment?paymentId=${paymentID}&token=${paymentToken}&PayerID=${payerID}`)
          .then((res: any) => {
            console.log('pay-success:', res);
            if (res.state === 'approved'){
              alert('EL PAGO HA PASADO CON EXITO!!');
            }else{
              alert('HA OCURRIDO UN ERROR AL REALIZAR ESTE METODO DE PAGO');
            }
          });
      }
    }, '#paypal-button');
  }
}
