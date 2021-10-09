import { createStore, combineReducers, applyMiddleware } from "redux";
import produce from "immer";
import loginReducer from './reducers/login-reducer'
import userPersonalDataReducer from './reducers/userPersonalData-reducer'
import userAccountsDataReducer from './reducers/userAccountsData-reducer'
import thunk from 'redux-thunk'

// INITIAL STATE ( sliced into features )
export const initialState = {

    Login: {     
        isConnected: false,
        token: null
    },
    UserPersonalData : {
        id: '', 
        email: '',
        password: '',
        firstName: '',
        lastName: '',
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
        }
    }
}
export const loginState = (initialState) => initialState.Login;
export const userDataState = (initialState) => initialState.UserPersonalData;
export const userAccountsDataState = (initialState) => initialState.UserAccountsData;


const reducers = combineReducers({
    login: loginReducer,
    userData: userPersonalDataReducer,
    userAccount : userAccountsDataReducer
})

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.subscribe(() => {
    console.log("Nouveau state:");
    console.log(store.getState());
});