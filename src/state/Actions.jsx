// import * as actionTypes from './ActionTypes'
import { 
    SET_TOKEN, SET_CONNECTED,
    SET_ID, SET_EMAIL, SET_PW, SET_FIRSTNAME, SET_LASTNAME,
    SET_TOTALACCOUNTS, SET_ACCOUNTS
} from '../ActionTypes'

// ......................................................
// ACTIONS CREATORS : LOGIN 
// ......................................................
export const setToken = (token) => (dispatch) => (dispatch({ type: SET_TOKEN , payload: token  }));
export const setConnected = (isConnected) => (dispatch) => (dispatch({ type: SET_CONNECTED, payload:isConnected  }));

// ......................................................
// ACTIONS CREATORS : USER PERSONAL DATA
// ......................................................
// used when : user has logged in ( email+password ) and user profile page requests user data
// used when : user edit his first/lastName
export const setId = (id) => (dispatch) => { dispatch({ type: SET_ID, payload: id })};
// export const setId = (id) => ({ type: "setId", payload: id });
export const setEmail = (email) => (dispatch) => (dispatch({ type: SET_EMAIL, payload: email }));
export const setPassword = (password) => (dispatch) => (dispatch({ type: SET_PW, payload: password}))
export const setFirstName = (firstName) => (dispatch) => (dispatch({ type: SET_FIRSTNAME, payload: firstName }));
export const setLastName = (lastName) => (dispatch) => (dispatch({ type: SET_LASTNAME, payload: lastName }));

// ......................................................
// ACTIONS CREATORS : USER ACCOUNTS DATA
// ......................................................
// used when: user profile page requests user accounts data
// used when: user clicks 'view transactions' on user profile page
export const setTotalAccounts = (totalAccounts) => (dispatch) => (dispatch({ type: SET_TOTALACCOUNTS, payload: totalAccounts }));
export const setAccounts = (accounts) => (dispatch) => (dispatch({ type: SET_ACCOUNTS, payload: accounts }));

