


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
