//FUENTE: https://github.com/wkh237/react-native-fetch-blob

import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

import store from 'react-native-simple-store'

// Convierte a array de objetos con clave
//  @param snap objeto de BBDD de Firebase
export function getArrayFromSnap(snap){
  let items = []
  let itemsObj = snap.val()
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

// Actualiza un nuevo objeto a la ruta
//  @param firebase Objeto firebase inicializado
//  @param path ruta destino
//  @param item objeto a subir
export function updateObject(firebase, path, object){
  let fbDatabaseRef = firebase.database().ref()
  let updateItemRef = fbDatabaseRef.child(path)
  updateItemRef.update(object)
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
