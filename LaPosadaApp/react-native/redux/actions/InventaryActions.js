import * as FirebaseUtils from '../../utils/FirebaseUtils'

/*
* Actualiza la fecha de actualizacion del inventario
*/
function updateLastUpdatedate(){
  return (dispatch, getState)=>{
      const state = getState()
      let fbDatabaseRef = state.appDataState.fbDatabaseRef
      let inventaryItemRef = fbDatabaseRef.child('inventario')
      inventaryItemRef.update({
        'fecha-actualizacion':new Date()
      })
  }
}


/*
* Borra el nuevo elemento del inventario
*/
export function deleteItem(itemId){
  return (dispatch, getState)=>{
      const state = getState()
      let fbDatabaseRef = state.appDataState.fbDatabaseRef
      let path = 'inventario/elementos/'+itemId
      let inventaryItemsItemRef = fbDatabaseRef.child(path)
      inventaryItemsItemRef.set(null)
      dispatch(updateLastUpdatedate())
  }
}

/*
* Actualiza el elemento del inventario
*/
export function updateItem(itemId, item){
  return (dispatch, getState)=>{
      const state = getState()
      let fbDatabaseRef = state.appDataState.fbDatabaseRef
      let path = 'inventario/elementos/'+itemId
      console.log(path);
      let inventaryItemsItemRef = fbDatabaseRef.child(path)
      inventaryItemsItemRef.set(item)
      dispatch(updateLastUpdatedate())
  }
}

/*
* Añade un nuevo elemento al inventario
*/
export function addNewItem(name, description, quantity, file){
  return (dispatch, getState)=>{
      const state = getState()

      let firebase = state.appDataState.firebase
      let fbImagesFolder = 'imagenes/inventario'
      FirebaseUtils.uploadImageFileToFirebase(firebase, fbImagesFolder, file)
      .then((url)=>{

        let item = {
          nombre:name,
          descripcion:description,
          cantidad:quantity,
          imagen:url
        }

        let fbDatabaseRef = state.appDataState.fbDatabaseRef
        let path = 'inventario/elementos'
        let inventaryItemsItemRef = fbDatabaseRef.child(path)
        inventaryItemsItemRef.push(item)
        
        dispatch(updateLastUpdatedate())
      }).catch(error => {
        console.log(error)
      })
  }
}
