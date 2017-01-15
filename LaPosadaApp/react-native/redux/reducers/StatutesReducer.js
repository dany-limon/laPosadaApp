import * as types from '../ActionTypes'

const initialState = {
  items:[],
};

export default function statutesState(state = initialState, action = {}) {
  switch (action.type) {
    case types.STATUTES_UPDATE_ITEMS:
      return {
        ...state,
        items: action.items,
      }
    default:
      return state
  }
}
