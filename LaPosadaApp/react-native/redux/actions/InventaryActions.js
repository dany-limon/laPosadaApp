import * as FirebaseUtils from '../../utils/FirebaseUtils'
import * as types from '../ActionTypes'

/*******************************************
* Constantes
*******************************************/
const PATH = 'inventario'
const ITEMS_PATH = PATH + '/elementos'
const IMAGE_PATH = 'imagenes/inventario'


/*
* Actualiza los items del inventario
* @param items Array de objetos del inventario
*/
function updateItems(items){
  return {
    type: types.INVENTARY_UPDATE_ITEMS,
    items:items
  }
}


/*
* Inicializa para recibir los items del inventario de Firebase
* @parama firebaseApp Referencia a Firebase
* @parama dispatch dispatch de Redux
*/
export function initializeInventary(firebaseApp, dispatch){

  //Recuperar datos cacheados
  FirebaseUtils.getCacheObject(PATH)
  .then((items)=>{
    dispatch(updateItems(items))
  })

  //Obtener datos desde Firebase
  firebaseApp.database().ref(ITEMS_PATH).on('value', (snap) => {
    let items = FirebaseUtils.getArrayFromSnap(snap)
    dispatch(updateItems(items))
    FirebaseUtils.storeCacheObject(PATH, items)
    console.log('Datos del inventario recibidos',items)
  })
}

/*
* Actualiza la fecha de actualizacion del inventario
*/
function updateLastUpdatedate(){
  return (dispatch, getState)=>{
      const state = getState()
      let firebase = state.appDataState.firebase
      let fbDatabaseRef = firebase.database().ref()
      let inventaryItemRef = fbDatabaseRef.child(PATH)
      inventaryItemRef.update({
        'fecha-actualizacion':(new Date()).getTime()/1000
      })
  }
}

/*
* Borra el nuevo elemento del inventario
*/
export function deleteItem(item){
  return (dispatch, getState)=>{
    if (item && item.key){
      const state = getState()
      let firebase = state.appDataState.firebase
      let path = ITEMS_PATH + '/' + item.key
      FirebaseUtils.deleteObject(firebase, path)
      dispatch(updateLastUpdatedate())
    }
  }
}

/*
* Añade un nuevo elemento al inventario
*/
export function addNewItem(name, description, quantity, file){
  return (dispatch, getState)=>{
      const state = getState()
      let firebase = state.appDataState.firebase

      let item = {
        nombre:name,
        descripcion:description,
        cantidad:quantity,
      }

      if (!file){
        FirebaseUtils.addNewObject(firebase, ITEMS_PATH, item)
        dispatch(updateLastUpdatedate())
      }else{
        FirebaseUtils.uploadImageFileToFirebase(firebase, IMAGE_PATH, file)
        .then((url)=>{
          item.imagen = url
          FirebaseUtils.addNewObject(firebase, ITEMS_PATH, item)
          dispatch(updateLastUpdatedate())
        }).catch(error => {
          console.log(error)
          FirebaseUtils.addNewObject(firebase, ITEMS_PATH, item)
          dispatch(updateLastUpdatedate())
        })
      }
  }
}

/*
* Actualiza el elemento del inventario
* @parama item Objeto a actualizar
* @parama state Estado nuevo del objeto
*/
export function updateItem(item, objState){
  return (dispatch, getState)=>{
    if (item && item.key){
      const state = getState()

      let firebase = state.appDataState.firebase
      let itemPath = ITEMS_PATH + '/' + item.key
      let object = { }
      if (objState.name){
        object.nombre = objState.name
      }
      if (objState.description){
        object.descripcion = objState.description
      }
      if (objState.quantity){
        object.cantidad = objState.quantity
      }
      if (objState.image){
        object.imagen = objState.image
      }
      dispatch(updateLastUpdatedate())

      if (!objState.imageFile){
        FirebaseUtils.updateObject(firebase, itemPath, object)
      }else{
        FirebaseUtils.uploadImageFileToFirebase(firebase, IMAGE_PATH, objState.imageFile)
        .then((url)=>{
          object.imagen = url
          FirebaseUtils.updateObject(firebase, itemPath, object)
        }).catch(error => {
          console.log(error)
          FirebaseUtils.updateObject(firebase, itemPath, object)
        })
      }
    }
  }
}
