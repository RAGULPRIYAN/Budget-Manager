// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:5000/api'
  // url: 'http://192.168.227.127:5000/api'
  // url :'http://192.168.169.165:5000/api'
  // url :'http://192.168.50.165:5000/api'
 
};

export const environment1 = {  
  production: false,  
  firebase: {  
    apiKey: "AIzaSyAihfGzibkuW59eTwVjOPDYebMAxaBuggc",
    authDomain: "ionic-bb82e.firebaseapp.com",
    projectId: "ionic-bb82e",
    storageBucket: "ionic-bb82e.appspot.com",
    messagingSenderId: "9842548374",
    appId: "1:9842548374:web:d67c892662a739889c2cb7",
    measurementId: "G-100P8FWG4D"
//     apiKey: "AIzaSyBHCTx0ZtYL5YceYlKSkbZ_4UUjmjWyhSI",
// authDomain: "seismic-plexus-337108.firebaseapp.com",
// projectId: "seismic-plexus-337108",
// storageBucket: "seismic-plexus-337108.appspot.com",
// messagingSenderId: "892513188459",
// appId: "1:892513188459:web:cb36c0b6b37201fb9a0f2e",
// measurementId: "G-BPE9PBJKWM"
  }  ,
  CountryJson: [
    { name: 'India', dial_code: '+91', code: 'IN' },
    { name: 'Pakistan', dial_code: '+92', code: 'PK' }
  ]
};  

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
