import * as types from '../ActionTypes'

const initialState = {
  items:[],
};

export default function meetingsState(state = initialState, action = {}) {
  switch (action.type) {
    case types.MEETINGS_UPDATE_ITEMS:
      return {
        ...state,
        items: action.items,
      }
    default:
      return state
  }
}
