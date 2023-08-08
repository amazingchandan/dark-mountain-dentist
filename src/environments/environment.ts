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
  PAYPAL_CLIENT_ID: 'AeKffQqEC4lR2FtZBUdTIlOz6vMXajfBakTU2IIqdmA18KxLwV7FHpfMagXrAqf0RAwc7evqE3_HcvKr',
  PAYPAL_CLIENT_SECRET_KEY: 'EPNEGNEQmmqoQ3-Re3U7gyVkH3jIPS1h8Ai_mti1fBdMwkpIu2GeQxqFxg3Oy4JetoMQM-PLMK4yjBLU',
  PROD_ID: 'PROD-6X2846590V484010V',
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
