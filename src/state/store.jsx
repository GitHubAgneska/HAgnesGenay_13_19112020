import { createStore, combineReducers, applyMiddleware } from "redux";
import loginReducer from './reducers/login-reducer'
import userPersonalDataReducer from './reducers/userPersonalData-reducer'
import userAccountsDataReducer from './reducers/userAccountsData-reducer'
import thunk from 'redux-thunk'

// INITIAL STATE ( sliced into features )
export const initialState = {

    Login: {     
        isConnected: false,
        token: null,
        // fetchLogin state
        status: 'void',
        error: null
    },
    UserPersonalData : {
        id: '', 
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        // fetchUserPersData state
        status: 'void',
        data: null,
        error: null
    },
    UserAccountsData : {
        totaAccounts: null,
        accounts : [],
        account: {
            type: '',
            currency: 'USD',
            balance: '',
            transactionsHistory: "last 10 days",
            transactions: [],
        },
        // fetchUserAccountsData state
        status: 'void',
        data: null,
        error: null
    }
}

// SELECTORS
export const loginState = (state) => state.login;
export const userDataState = (state) => state.userData;
export const userAccountsDataState = (state) => state.userAccount;


export const reducers = combineReducers({
    login: loginReducer,
    userData: userPersonalDataReducer,
    userAccount : userAccountsDataReducer
})
// connect store to browser redux devtools extension
// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.subscribe(() => {
    console.log("Nouveau state:");
    console.log(store.getState());
});