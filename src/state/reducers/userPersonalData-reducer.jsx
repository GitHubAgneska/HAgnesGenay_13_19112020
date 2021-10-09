import { SET_ID, SET_EMAIL, SET_PW, SET_FIRSTNAME, SET_LASTNAME } from '../ActionTypes'
import { initialState } from '../store'

// ......................................................
//  USER PERSONAL DATA REDUCER (takes care of state for user personal data)
// ......................................................
// used when : user has logged in ( email+password ) and user profile page requests user data
// used when : user edit his first/lastName
function userPersonalDataReducer(state = initialState.UserPersonalData, action) {

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
    }
}

export default userPersonalDataReducer