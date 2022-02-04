import { LOGINFETCHING, LOGINRESOLVED, LOGINREJECTED } from '../ActionTypes'
import { initialState } from '../store'
import produce from 'immer'
// ......................................................
// LOGIN  REDUCER
// ......................................................
function loginReducer (state = initialState.Login, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGINFETCHING: {
        if (draft.status === 'void') {
          draft.status = 'pending'
          return
        }
        if (draft.status === 'rejected') {
          draft.error = null
          draft.status = 'pending'
          return
        }
        if (draft.status === 'resolved') {
          draft.status = 'updating' // ongoing request but presence of data
          return
        }
        // else action ignored
        return
      }
      case LOGINRESOLVED: {
        localStorage.setItem('token', action.payload.token); // remember me
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.status = 'resolved'
          draft.token = action.payload.token
          draft.isConnected = true
          return
        }
        // else action ignored
        return
      }
      case LOGINREJECTED: {
        localStorage.removeItem('token');
        if (draft.status === 'pending' || draft.status === 'updating') {
          // set to rejected, save error, delete data
          draft.status = 'rejected'
          draft.error = action.payload
          draft.data = null
        }
        return
        // else action ignored
      }
      // any other case (invalid action or initialisation) : return state without modification
      default:
        return state;
    }
  })
}

export default loginReducer
