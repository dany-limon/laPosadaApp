import * as types from '../ActionTypes'

const initialState = {
  fbDataBase:null,      //BBDD de Firebase
  fbDatabaseRef:null,    //Referencia a la BBDD de Firebase
  fbStorageRef:null,
  fbStorageImageRef:null,
  firebase:null
};

export default function appDataState(state = initialState, action = {}) {
  switch (action.type) {
    case types.APP_DATA_UPDATE:
      return {
        ...state,
        fbDataBase: action.fbDataBase
      }
    case types.APP_FIREBASE_REFERENCE_UPDATE:
      return {
        ...state,
        firebase: action.firebase,
        fbDatabaseRef: action.fbDatabaseRef,
        fbStorageRef: action.fbStorageRef,
        fbStorageImageRef: action.fbStorageImageRef
      }
    default:
      return state
  }
}
