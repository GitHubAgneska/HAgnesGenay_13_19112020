import { USERPERSDATA_EDIT_FETCHING, USERPERSDATA_EDIT_RESOLVED, USERPERSDATA_EDIT_REJECTED } from '../ActionTypes'
import { initialState } from '../store'
import produce from 'immer'
// ......................................................
//  USER PERSONAL DATA EDIT REDUCER (takes care of state for user personal data editing (POST request) )
// ......................................................
// used when : user edit his first/lastName
function userPersonalData_editReducer(state = initialState.UserPersonalData, action) {
        return produce(state, (draft) => {
            switch (action.type) {
                case USERPERSDATA_EDIT_FETCHING: {
                    if ( draft.status === 'void') { 
                        draft.status = 'pending'
                        return
                    }
                    if ( draft.status === 'rejected') {
                        draft.error = null
                        draft.status = 'pending'
                        return
                    }
                    if ( draft.status === 'resolved') {
                        draft.status = 'updating' // ongoing request but presence of data
                        return
                    }
                    // else action ignored
                    return
                }
                case USERPERSDATA_EDIT_RESOLVED: {
                    if ( draft.status === 'pending' || draft.status === 'updating') {
                        draft.status = 'resolved'
                        draft.data = action.payload
                        return
                    }
                    // else action ignored
                    return
                }
                case USERPERSDATA_EDIT_REJECTED: {
                    if ( draft.status === 'pending' || draft.status === 'updating') {
                        // set to rejected, save error, delete data
                        draft.status = 'rejected'
                        draft.error = action.payload
                        draft.data = null
                        return
                    }
                    // else action ignored
                    return
                }
                // any other case (invalid action or initialisation) : return state without modification
                default: return
            }
        })
}
export default userPersonalData_editReducer