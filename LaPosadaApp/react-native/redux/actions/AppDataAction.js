import * as types from '../ActionTypes'
import * as InventaryActions from './InventaryActions'
import * as FirebaseUtils from '../../utils/FirebaseUtils'

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

//Almacena en el store la referencia a Firebase
function updateFirebaseRef(firebase){
  return {
    type: types.APP_FIREBASE_REFERENCE_UPDATE,
    firebase:firebase,
  }
}

//Actualiza en el store los datos de Firebase
function updateData(fbDataBase) {
  return {
    type: types.APP_DATA_UPDATE,
    fbDataBase:fbDataBase
  }
}

//Inicializa la app
export function initializeApp(){
  return (dispatch, getState)=>{
      initializeFirebase(dispatch)
  }
}

//Inicializa y configura Firebase
function initializeFirebase(dispatch){
  dispatch(updateFirebaseRef(firebaseApp))

  InventaryActions.initializeInventary(firebaseApp, dispatch)
}
