import { createStore, combineReducers, applyMiddleware } from 'redux'
import loginReducer from './reducers/login-reducer'
import userPersonalDataReducer from './reducers/userPersonalData-reducer'
import userAccountsDataReducer from './reducers/userAccountsData-reducer'
import thunk from 'redux-thunk'
// import { configureStore } from '@reduxjs/toolkit'

// INITIAL STATE ( sliced into features )
export const initialState = {

  Login: {
    isConnected: false,
    token: null,
    // fetchLogin state
    status: 'void',
    error: null
  },
  UserPersonalData: {
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    // fetchUserPersData state
    status: 'void',
    data: null,
    error: null,
    // fetchCREATEUserPersData state
    post_status: 'void',
    post_data: null,
    post_error: null
  },
  UserPersonalDataEdit: {
    // fetch UserPersData edit state
    status: 'void',
    data: null,
    error: null
  },
  UserAccountsData: {
    totaAccounts: null,
    accounts: [],
    account: {
      type: '',
      currency: 'USD',
      balance: '',
      transactionsHistory: 'last 10 days',
      transactions: []
    },
    // fetchUserAccountsData state
    status: 'void',
    data: null,
    error: null
  }
}

// SELECTORS
export const loginState = (state) => state.login
export const userDataState = (state) => state.userData
export const userData_editState = (state) => state.userDataEdit
export const userAccountsDataState = (state) => state.userAccount

export const reducers = combineReducers({
  login: loginReducer,
  userData: userPersonalDataReducer,
  userAccount: userAccountsDataReducer
})

// adding of a 'rootReducer' allows a complete reset of all sub-reducers on logout
export const rootReducer = (state, action) => {
  return reducers(state, action)
}

// TO REVIEW ---
// connect store to browser redux devtools extension (is a boolean)
// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// => devtools allow 'CONFIGURESTORE(<store enhancer(s)> e.g THUNK) on top of standard 'createStore()'
// => export const store = configureStore({ reducer: rootReducer })

export const store = createStore(rootReducer, applyMiddleware(thunk))
// export const store = createStore(reducers, applyMiddleware(thunk)); // ( 'reducers' replaced with 'rootReducer' to englobe all subreducers)

store.subscribe(() => {
  console.log('Nouveau state:')
  console.log(store.getState())
})
