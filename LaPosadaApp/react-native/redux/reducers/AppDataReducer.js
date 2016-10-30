import * as types from '../ActionTypes'

const initialState = {
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
      }
    default:
      return state
  }
}
