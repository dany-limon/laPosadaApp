import * as types from '../ActionTypes'

const initialState = {
  data:null
};

export default function appDataState(state = initialState, action = {}) {
  switch (action.type) {

    case types.APP_DATA_UPDATE:
      return {
        ...state,
        data: action.data
      }

    default:
      return state
  }
}
