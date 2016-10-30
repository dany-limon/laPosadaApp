import * as types from '../ActionTypes'

const initialState = {
  items:null
};

export default function inventaryState(state = initialState, action = {}) {
  switch (action.type) {
    case types.INVENTARY_UPDATE_ITEMS:
      return {
        ...state,
        items: action.items,
      }
    default:
      return state
  }
}
