import * as types from '../ActionTypes'

const initialState = {
  firebase:null,
  loginInProgress:false
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
      case types.UPDATE_LOGIN_PROGRESS:
        return {
          ...state,
          loginInProgress: action.value,
        }
    default:
      return state
  }
}
