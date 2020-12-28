import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

/*

    firebase deploy -> Subir funciones GET POST a Produccion
    firebase serve -> Probar localmente
    
*/

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.json({
    mensaje: "Hola mundo desde funciones de Firebase!!"
  });
});
