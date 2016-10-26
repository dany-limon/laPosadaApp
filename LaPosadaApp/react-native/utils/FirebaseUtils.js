//FUENTE: https://github.com/wkh237/react-native-fetch-blob

import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

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
