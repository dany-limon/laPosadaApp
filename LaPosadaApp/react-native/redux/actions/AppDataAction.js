import * as types from '../ActionTypes'

export function updateData(data) {
  return {
    type: types.APP_DATA_UPDATE,
    data:data
  }
}
