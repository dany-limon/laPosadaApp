//COnvertir imagen a blob para evitar bug de Firebase
//FUENTE: https://github.com/wkh237/react-native-fetch-blob
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

//Redimensionar imagenes
import ImageResizer from 'react-native-image-resizer';

import store from 'react-native-simple-store'
import {Alert} from 'react-native'

// Convierte a array de objetos con clave
//  @param snap objeto de BBDD de Firebase
export function getArrayFromSnap(snap){

  if (!snap){
    return []
  }

  let items = []
  let itemsObj = snap.val()
  if (!itemsObj){
    return []
  }

  Object.keys(itemsObj).map((key)=>{
    let item = itemsObj[key]
    item.key = key
    items.push(item)
  })

  return items
}

// Elimina el nuevo objeto de la ruta
//  @param firebase Objeto firebase inicializado
//  @param path ruta destino
export function deleteObject(firebase, path){
  let fbDatabaseRef = firebase.database().ref()
  let deleteItemRef = fbDatabaseRef.child(path)
  deleteItemRef.set(null)
}

// Añade un nuevo objeto a la ruta
//  @param firebase Objeto firebase inicializado
//  @param path ruta destino
//  @param item objeto a subir
export function addNewObject(firebase, path, object){
  let fbDatabaseRef = firebase.database().ref()
  let newItemRef = fbDatabaseRef.child(path)
  newItemRef.push(object)
}

export function login(firebase, email, password){
  return new Promise(function (fulfill, reject){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ' ' + errorMessage);
      if (errorCode=='auth/wrong-password'){
        reject('La contraseña no es válida')
      }else if (errorCode=='auth/user-not-found'){
        reject('El usuario no está registrado')
      }else if (errorCode=='auth/invalid-email'){
      reject('El email introducido no es válido')
      }else{
        reject(error.message)
      }
      fulfill()
    })
  })
}

export function closeSesion(firebase){
  firebase.auth().signOut().then(function() {
    console.log('Sesion cerrada');
  }, function(error) {
      console.log('Error al cerrar la sesion');
  });
}

export function ressetPassword(firebase, email){
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Email sent.
    console.log('Email enviado')
    Alert.alert( 'Restablecer contraseña', 'Te hemos enviado un email para restablecer la contraseña', [ {text: 'Aceptar'}, ] )
  }, function(error) {
    // An error happened.
    console.log(error.code + ' ' + error.message)
    if (error.code == 'auth/invalid-email'){
      Alert.alert( 'Restablecer contraseña', 'El email introducido no es válido', [ {text: 'Aceptar'}, ] )
    }else if (error.code == 'auth/user-not-found'){
        Alert.alert( 'Restablecer contraseña', 'El email no corresponde con ningún usuario registrado', [ {text: 'Aceptar'}, ] )
    }else{
      Alert.alert( 'Restablecer contraseña', 'Ha ocurrido un error: ' + error.message, [ {text: 'Aceptar'}, ] )
    }
  })
}
// Promise que sube el fichero a Firebase y devuelve su url
//  @param firebase Objeto firebase inicializado
//  @param forder Carpeta destino
//  @param file ruta de la imagen
//  @return url de la imagen subida o error
export function uploadImageFileToFirebase(firebase, folder, file){
  return new Promise(function (fulfill, reject){
    let fileName = (new Date()).getTime() + '.jpg'
    let rnfbURI = RNFetchBlob.wrap(file)
    Blob
      .build(rnfbURI, { type : 'image/jpg;'})
      .then((blob) => {
        firebase.storage()
          .ref(folder)
          .child(fileName)
          .put(blob, { contentType : 'image/jpg' })
          .then((snapshot) => {
            let url = snapshot.metadata.downloadURLs[0]
            blob.close()
            fulfill(url)
          })
      }).catch(error => {
        reject(error)
      })
    })
}


// Recupera un objeto cacheado (disco) con la clave
//  @param key Clave del objeto
export function getCacheObject(key){
    return new Promise(function (fulfill, reject){
      store.get(key)
      .then(items => {
        if (items){
          fulfill(items)
        }
      }).catch(error => {
        reject(error)
      })
    })
}

// Cachea un objeto (disco) con la clave
//  @param key Clave del objeto
//  @param object Objecto a cachear
export function storeCacheObject(key, object){
    return new Promise(function (fulfill, reject){
      store.save(key, object)
      .then( _ => {
        fulfill(true)
      }).catch(error => {
        reject(false)
      })
    })
}

export function uploadMultipleImageResolutionFirebase(firebase, folder, imageUri){
  return new Promise(function (fulfill, reject){
    let urlMini = null
    let urlMedi = null
    ImageResizer.createResizedImage(imageUri, 160, 160, 'JPEG', 50)
    .then((resizedImageUri) => {
      console.log('resized: ' + resizedImageUri);
      return uploadImageFileToFirebase(firebase, folder, resizedImageUri)
    }).then((urlMiniTemp)=>{
      console.log('Subida foto mini', urlMiniTemp);
      urlMini = urlMiniTemp
      return ImageResizer.createResizedImage(imageUri, 320, 320, 'JPEG', 75)
    }).then((resizedImageUri) => {
      console.log('resized: ' + resizedImageUri);
      return uploadImageFileToFirebase(firebase, folder, resizedImageUri)
    }).then((urlMediTemp)=>{
      urlMedi = urlMediTemp
      return uploadImageFileToFirebase(firebase, folder, imageUri)
    }).then((url)=>{
      console.log('Subida foto maxi', url);
      fulfill({urlMini:urlMini, url:urlMedi, urlMaxi:url})
    }).catch((error) => {
      console.log(error);
      reject(error)
    });
  })
}

// Actualiza un nuevo objeto a la ruta
//  @param firebase Objeto firebase inicializado
//  @param path ruta destino
//  @param item objeto a subir
export function updateObject(firebase, path, object){

  //Quitar los parametros nulos para que no pete FirebaseUtils
  let deleteKeys = []
  for(var key in object) {
    if (!object[key]){
      deleteKeys.push(key)
    }
  }

  deleteKeys.map((key)=>{
    delete object[key]
  })

  let fbDatabaseRef = firebase.database().ref()
  let updateItemRef = fbDatabaseRef.child(path)
  updateItemRef.update(object)
}
