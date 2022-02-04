import { LOGOUT } from '../ActionTypes'
import { initialState, reducers } from '../store'

// ......................................................
// LOGOUT  REDUCER
// ......................................................
const rootReducer = (state = initialState, action) => {
  if (action.type === LOGOUT) {
    return reducers(undefined, action)
  }
  return reducers(state, action)
}

export default rootReducer
