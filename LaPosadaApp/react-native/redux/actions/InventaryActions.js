

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
* Añade un nuevo elemento al inventario
*/
export function addNewItem(item){
  return (dispatch, getState)=>{
      const state = getState()
      let fbDatabaseRef = state.appDataState.fbDatabaseRef
      let inventaryItemsItemRef = fbDatabaseRef.child('inventario/elementos')
      inventaryItemsItemRef.push(item)
      dispatch(updateLastUpdatedate())
  }
}

/*
* Borra un nuevo elemento al inventario
*/
export function deleteItem(itemId){
  return (dispatch, getState)=>{
      const state = getState()
      let fbDatabaseRef = state.appDataState.fbDatabaseRef
      let path = 'inventario/elementos/'+itemId
      console.log(path);
      let inventaryItemsItemRef = fbDatabaseRef.child(path)
      inventaryItemsItemRef.set(null)
      dispatch(updateLastUpdatedate())
  }
}

/*
* Borra un nuevo elemento al inventario
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
