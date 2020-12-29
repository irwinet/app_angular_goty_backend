import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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

export const getGOTY = functions.https.onRequest( async (request, response) => {
  // const nombre = request.query.nombre || 'Sin Nombre';

  // response.json({
  //   nombre
  // })

  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map(doc=>doc.data());

  response.json(juegos);

});


//Servidor Express -> Crear Servicios en Node
const app = express();

app.use(cors({origin:true}));

app.get('/goty', async (req, res)=>{
  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map(doc=>doc.data());

  res.json(juegos);
});


exports.api = functions.https.onRequest(app);