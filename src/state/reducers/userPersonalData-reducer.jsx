import { USERPERSDATAFETCHING, USERPERSDATARESOLVED, USERPERSDATAREJECTED, SET_ID, SET_EMAIL, SET_PW, SET_FIRSTNAME, SET_LASTNAME } from '../ActionTypes'
import { initialState } from '../store'
import produce from 'immer'
// ......................................................
//  USER PERSONAL DATA REDUCER (takes care of state for user personal data)
// ......................................................
// used when : user has logged in ( email+password ) and user profile page requests user data
function userPersonalDataReducer(state = initialState.UserPersonalData, action) {

    return produce(state, (draft) => {
        switch (action.type) {
            case USERPERSDATAFETCHING: {
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
            case USERPERSDATARESOLVED: {
                if ( draft.status === 'pending' || draft.status === 'updating') {
                    draft.status = 'resolved'
                    draft.data = action.payload
                    return
                }
                // else action ignored
                return
            }
            case USERPERSDATAREJECTED: {
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
            default:
                return
        }
    })
}

export default userPersonalDataReducer


/* // original chunk
switch(action.type) {
    case SET_ID: 
        return produce(state, (draft) => {
            draft.id = action.payload
        });
    case SET_EMAIL:
        return produce(state, (draft) => { 
            draft.email = action.payload
        });
    case SET_PW: return produce(state, (draft) => { 
        draft.password = action.payload 
        });
    case SET_FIRSTNAME: return produce(state, (draft) => { 
        draft.firstName = action.payload
    });
    case SET_LASTNAME: return produce(state, (draft) => { 
        draft.lastName = action.payload
    })
    default:
        return state
} */