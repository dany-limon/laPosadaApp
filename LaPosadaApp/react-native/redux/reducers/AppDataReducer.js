import * as types from '../ActionTypes'

const initialState = {
  fbDataBase:null,      //BBDD de Firebase
  fbDatabaseRef:null,    //Referencia a la BBDD de Firebase
  fbStorageRef:null,
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
        fbDatabaseRef: action.fbDatabaseRef,
        fbStorageRef: action.fbDatabaseRef
      }
    default:
      return state
  }
}
