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
*/
export function initialize(){

  return (dispatch, getState)=>{

    console.log('inicializando inventario');

      const state = getState()
      let firebase = state.appDataState.firebase

      //Recuperar datos cacheados
      FirebaseUtils.getCacheObject(PATH)
      .then((items)=>{
        console.log('inventario-cache', items);
        dispatch(updateItems(items))
      })

      //Obtener datos desde Firebase
      firebase.database().ref(ITEMS_PATH).on('value', (snap) => {
        console.log('inventario-firebase', items);
        let items = FirebaseUtils.getArrayFromSnap(snap)
        dispatch(updateItems(items))
        FirebaseUtils.storeCacheObject(PATH, items)
      })
  }
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
export function addNewItem(stateObj){
  return (dispatch, getState)=>{
      const state = getState()
      let firebase = state.appDataState.firebase

      let item = {... stateObj}

      if (!stateObj.imageFile){
        FirebaseUtils.addNewObject(firebase, ITEMS_PATH, item)
        dispatch(updateLastUpdatedate())
      }else{
        FirebaseUtils.uploadMultipleImageResolutionFirebase(firebase, IMAGE_PATH, stateObj.imageFile)
        .then((urls)=>{
          item.image = urls.url
          item.imageMini = urls.urlMini
          item.imageMaxi = urls.urlMaxi
          FirebaseUtils.addNewObject(firebase, ITEMS_PATH, item)
          dispatch(updateLastUpdatedate())
        }).catch((err) => {
          console.log(err);
          FirebaseUtils.addNewObject(firebase, ITEMS_PATH, item)
          dispatch(updateLastUpdatedate())
        });
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
      let object = {...objState, }

      dispatch(updateLastUpdatedate())

      if (!objState.imageFile){
        FirebaseUtils.updateObject(firebase, itemPath, object)
      }else{
        FirebaseUtils.uploadMultipleImageResolutionFirebase(firebase, IMAGE_PATH, objState.imageFile)
        .then((urls)=>{
          object.image = urls.url
          object.imageMini = urls.urlMini
          object.imageMaxi = urls.urlMaxi
          FirebaseUtils.updateObject(firebase, itemPath, object)
        }).catch(error => {
          console.log(error)
          FirebaseUtils.updateObject(firebase, itemPath, object)
        })
      }
    }
  }
}
