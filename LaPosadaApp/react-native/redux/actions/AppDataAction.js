import * as types from '../ActionTypes'
import * as FirebaseUtils from '../../utils/FirebaseUtils'
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native'


//Actualiza el pading superior de las escenas para que el navbar no las tape
function addScenesPadding(paddingScenes=true) {
  return {
    type: types.APP_ADD_PADDING,
    paddingScenes:paddingScenes
  }
}

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

function updateLoginProgress(value) {
  return {
    type: types.UPDATE_LOGIN_PROGRESS,
    value:value
  }
}

//Login en firebase
export function login(email, password){
  return (dispatch, getState)=>{
      dispatch(updateLoginProgress(true))
      const state = getState()
      let firebase = state.appDataState.firebase
      FirebaseUtils.login(firebase, email, password)
      .then(()=>{
        dispatch(updateLoginProgress(false))
      }).catch((err) => {
        console.log(err);
        Alert.alert( 'No se ha podido acceder', err, [ {text: 'Aceptar'}, ] )
        setTimeout(() => {
          dispatch(updateLoginProgress(false))
        }, 500);

      });


    }
}

//Cierra la sesion actual
export function closeSesion(){
  return (dispatch, getState)=>{
      const state = getState()
      let firebase = state.appDataState.firebase
      FirebaseUtils.closeSesion(firebase)
  }
}

//Enviar email de recuperar contraseña
export function resendToEmailPassword(email){
  return (dispatch, getState)=>{
      const state = getState()
      let firebase = state.appDataState.firebase
      FirebaseUtils.ressetPassword(firebase, email)
  }
}

//Inicializa y configura Firebase
function initializeFirebase(dispatch){
  dispatch(updateFirebaseRef(firebaseApp))

  //detectamos el estado del usuario
  firebaseApp.auth().onAuthStateChanged(function(user) {

    //Mostrar padding en escenas
    dispatch(addScenesPadding())

    //Mostramos la pantalla correspondiente
    if (user) {
      Actions.home()
    } else {
      Actions.login()
    }
  })
}
