import { SET_TOTALACCOUNTS, SET_ACCOUNTS } from '../ActionTypes'
import { initialState } from '../store'
import produce from 'immer'
// ......................................................
// USER ACCOUNTS DATA REDUCER (takes care of state for user accounts data)
// ......................................................
// used when: user profile page requests user accounts data
// used when: user clicks 'view transactions' on user profile page
function userAccountsDataReducer(state = initialState.UserAccountsData, action) {
    switch(action.type) {
        case SET_TOTALACCOUNTS:
            return produce(state, (draft) => { 
                draft.totalAccounts = action.payload
            });
        case SET_ACCOUNTS:
            return produce(state, (draft) => {
                draft.accounts = action.payload
            });
        default:
            return state;
    }
}

export default userAccountsDataReducer