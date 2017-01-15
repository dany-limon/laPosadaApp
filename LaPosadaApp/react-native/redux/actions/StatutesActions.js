import * as FirebaseUtils from '../../utils/FirebaseUtils'
import * as types from '../ActionTypes'


/*******************************************
* Constantes
*******************************************/
const PATH = 'estatutos'
const ITEMS_PATH = PATH + '/elementos'

/*
* Actualiza los items
* @param items Array de objetos
*/
function updateItems(items){
  return {
    type: types.STATUTES_UPDATE_ITEMS,
    items:items
  }
}

/*
* Inicializa para recibir los items de Firebase
*/
export function initialize(){

  return (dispatch, getState)=>{

      const state = getState()
      let firebase = state.appDataState.firebase

      //Recuperar datos cacheados
      FirebaseUtils.getCacheObject(PATH)
      .then((items)=>{
        dispatch(updateItems(items))
      })

      //Obtener datos desde Firebase
      firebase.database().ref(ITEMS_PATH).on('value', (snap) => {
        let items = FirebaseUtils.getArrayFromSnap(snap)
        dispatch(updateItems(items))
      })
  }
}
