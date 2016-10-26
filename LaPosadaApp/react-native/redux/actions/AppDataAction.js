import * as types from '../ActionTypes'

//*************************************************
// Firebase
//*************************************************
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAZPdz24aSCVeLLYolfiOsa4rg_PkJm4Y4",
  authDomain: "la-posada-29910.firebaseapp.com",
  databaseURL: "https://la-posada-29910.firebaseio.com",
  storageBucket: "la-posada-29910.appspot.com",
  messagingSenderId: "470755118242"
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

//Inicializa la app
export function initializeApp(){
  return (dispatch, getState)=>{
      initializeFirebase(dispatch, getState)
  }
}

//Inicializa y configura Firebase
function initializeFirebase(dispatch, getState){
  let fbDatabaseRef = firebaseApp.database().ref()
  let fbStorageRef = firebase.storage().ref()
  let fbStorageImageRef = firebase.storage().ref('rn-firebase-upload')
  dispatch(updateFirebaseRef(firebase, fbDatabaseRef, fbStorageRef, fbStorageImageRef))

  fbDatabaseRef.on('value', (snap) => {

    console.log('Datos Recibidos Firebase',snap);

    //Formateamos en items la BBDD de Firebase
    var items = {};
    snap.forEach((child) => {
      items[child.key] = child.val()
    })
    console.log('Formateados datos Firebase',items);

    //Almacenamos los items en el store de Redux
    dispatch(updateData(items))
  })
}

//Almacena en el store la referencia a Firebase
function updateFirebaseRef(firebase, fbDatabaseRef, fbStorageRef, fbStorageImageRef){
  return {
    type: types.APP_FIREBASE_REFERENCE_UPDATE,
    firebase:firebase,
    fbDatabaseRef:fbDatabaseRef,
    fbStorageRef:fbStorageRef,
    fbStorageImageRef:fbStorageImageRef
  }
}

//Actualiza en el store los datos de Firebase
function updateData(fbDataBase) {
  return {
    type: types.APP_DATA_UPDATE,
    fbDataBase:fbDataBase
  }
}
