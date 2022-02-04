import {
  USERPERSDATAFETCHING, USERPERSDATARESOLVED, USERPERSDATAREJECTED,
  USERPERSDATA_CREATE_FETCHING, USERPERSDATA_CREATE_RESOLVED, USERPERSDATA_CREATE_REJECTED
} from '../ActionTypes'
import { initialState } from '../store'
import produce from 'immer'
// ......................................................
//  USER PERSONAL DATA REDUCER
// ......................................................
function userPersonalDataReducer (state = initialState.UserPersonalData, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      
      // POST REQUEST
      case USERPERSDATA_CREATE_FETCHING: {
        if (draft.post_status === 'void') {
          draft.post_status = 'pending'
          return
        }
        if (draft.post_status === 'rejected') {
          draft.post_error = null
          draft.post_status = 'pending'
          return
        }
        if (draft.post_status === 'resolved') {
          draft.post_status = 'updating' // ongoing request but presence of data
          return
        }
        return
      }
      case USERPERSDATA_CREATE_RESOLVED: {
        // console.log('EMPLOYEE_CREATE_RESOLVED => PAYLOAD==', action.payload, action.payload.employee)
        if (draft.post_status === 'pending' || draft.post_status === 'updating') {
          draft.post_status = 'resolved'
          const newEmployee = action.payload.employee
          draft.post_data = newEmployee
          draft.collection.push(newEmployee)
          draft.data.push(newEmployee)
          return
        }
        return
      }
      case USERPERSDATA_CREATE_REJECTED: {
        // console.log('CREATE_EMPLOYEE_REJECTED => PAYLOAD==', action.payload )
        if (draft.post_status === 'pending' || draft.post_status === 'updating') {
          // set to rejected, save error, delete data
          draft.post_status = 'rejected'
          draft.post_error = action.payload
          draft.post_data = null
          return
        }
        return
      }

      // GET REQUEST
      case USERPERSDATAFETCHING: {
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
      case USERPERSDATARESOLVED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.status = 'resolved'
          draft.data = action.payload
          draft.firstName = action.payload.body.firstName
          draft.lastName = action.payload.body.lastName
          return
        }
        // else action ignored
        return
      }
      case USERPERSDATAREJECTED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          // set to rejected, save error, delete data
          draft.status = 'rejected'
          draft.error = action.payload
          draft.data = null
        }
        // else action ignored
        return
      }
      // any other case (invalid action or initialisation) : return state without modification
      default: return state
    }
  })
}
export default userPersonalDataReducer
