// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl:"https://localhost:7098",
  apiUrl:"https://localhost:7109",
  // apiUrl:"https://3.109.54.128:443",
  // apiUrl:"https://d0ec-115-247-164-212.ngrok-free.app",
  //baseUrl:"https://localhost:7098",
  //baseUrl: "http://demostrateonline.com:5001",//'http://dashboard.atcemr.com', // Change this to the address of your backend API if different from frontend address
   baseUrl: "https://localhost:7109",//'http://dashboard.atcemr.com', // Change this to the address of your backend API if different from frontend address
  //  baseUrl: "https://3.109.54.128:443",//'http://dashboard.atcemr.com', // Change this to the address of your backend API if different from frontend address
  tokenUrl: null, //'http://dashboard.atcemr.com',// For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
  loginUrl: '/login',
  googleMapsApiKey: 'AIzaSyA7cUKxYBQIS07vLw8aniZJIUUwYSGAGik',
  syncfusionLicenseKey: 'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5edHRRQmBcVUB0Wko=',
  google_client_id: '836345802027-s4dvqscsotr7h19nrrhh992vantqbc8q.apps.googleusercontent.com',
  googlemeetpro1_clientid: '525236266314-ni141b1afd6okhndjvh72nqi31kqnv9n.apps.googleusercontent.com',
  googlemeetpro1_clientsecret: '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'
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
