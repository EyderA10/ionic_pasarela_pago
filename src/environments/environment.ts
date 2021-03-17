// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKeyStripe: 'pk_test_51IUCKDIBGciP9o185RrZxgHxm1hAQe4VaAXY4FeVS1N60N1wgqL3c2Utiax8336se6vVU0VsKWQH48vBAaII3CIF002hetOW4t',
  mode: {
    local: 'localhost',
    production: '192.168.1.6' // ip de mi pc
  },
  paypal: {
    mode: {
      sandbox: 'sandbox',
      production: 'production'
    },
    production: 'AUbY38kBYMPN9p9_I1k_Chvl8hUM8LBJElABT1p4jSC765ItnurX2TWYj8QzvYleoT0XM7EsHtleVkX1',
    client_id: 'AY6LbiXKqQOTWmSEUABZnGMrE2qiNkW04PWWnxgXoL5QyS37GdU4V20h0RXUAE3Hm5qeo6Vqs-YJ6I6f',
    client_secret: 'ELiKObzkNueeteT9xXcIn5mJrlJ0vMOItKd33jnbRfeol2mNijFzoFMI4qw9GVQqTDotPGYMxZWeMWRc'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
