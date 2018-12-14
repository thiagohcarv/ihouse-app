import { Injectable } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Dialog } from '../dialog/dialog';

const PAYPAL_PRODUCTION_CLIENT_ID = "";
const PAYPAL_SANDBOX_CLIENT_ID = "Ac4Npx6lM8wgeWKlHPc_va2OSqWg3k-l_mfRbnbOCSb3UXNhxtWAC5rF9ZN-j2opVSkDN2ksBAXfCjaG";
const DEV_ENVIRONMENT = "PayPalEnvironmentSandbox";
const PROD_ENVIRONMENT = "PayPalEnvironmentProduction";

@Injectable()
export class PaypalProvider {
  constructor(private payPal: PayPal, private dialog: Dialog) { }

  openPayment(amount: string, currency: string, shortDescription: string, callbackSuccess, callbackError): void {
    callbackSuccess();
    // return this.payPal.init({
    //   PayPalEnvironmentProduction: PAYPAL_PRODUCTION_CLIENT_ID,
    //   PayPalEnvironmentSandbox: PAYPAL_SANDBOX_CLIENT_ID
    // }).then(() => {
    //   this.payPal.prepareToRender("PayPalEnvironmentSandbox", new PayPalConfiguration({})).then(() => {
    //     let payment = new PayPalPayment(amount, currency, shortDescription, 'job');
    //     this.payPal.renderSinglePaymentUI(payment).then((res) => {
    //       console.log(res);
    //       callbackSuccess();
    //       this.dialog.presentAlert('Payment was successful');

    //     }, (err) => {
    //       // Error or render dialog closed without being successful
    //          return callbackError(err);
    //       console.log('ERROR:RENDER', err);
    //     });
    //   }, (err) => {
    //     // Error in configuration
    //     console.log('ERROR:CONFIGURATION', err);
    //   });
    // }, (err) => {
    //   // Error in initialization, maybe PayPal isn't supported or something else
    //   console.log('ERROR:INIT', err);
    // });
  }
}
