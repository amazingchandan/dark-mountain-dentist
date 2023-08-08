// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  PAYPAL_API: 'https://api-m.sandbox.paypal.com/v1/',
  API_HOST: 'http://localhost:3100/',
  LOCAL_HOST: 'http://localhost:4200/',
  AI_URL: 'https://c602-52-173-187-78.ngrok-free.app/predict',
  GEO_LOCATION: "https://ipgeolocation.abstractapi.com/v1/?api_key=57a0cd43f17f4cf1a1dfa5e126095364",
  // ! paypal
  PAYPAL_CLIENT_ID: 'AYCBFqGe2Tco1l33ZXvZXbdPKfPJVyqa2-NjAta0ytO1zR406yq2O66FkBI2_IdvKiRaUOcMPbTM-Ys_',
  PAYPAL_CLIENT_SECRET_KEY: 'EB7iibKAc300PD34UVfZC_ESm6XWeJsCRK9GZq0ccemEGL4pmb4Py_PYyLuozAeJdkUVNQ1N-CmTroM6',
  PROD_ID: 'PROD-1PK24124KM619970U',
  // ! google recaptcha
  recaptcha: {
    siteKey: '6Ld7TU0mAAAAAFjH7axIGjhz4hCyTVTkAzGOtUfs'
  },
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
