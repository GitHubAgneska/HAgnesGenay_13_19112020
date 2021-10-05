import { createStore } from "redux";
import produce from "immer";


// state
const initialState = {
    isConnected: false,
    token: null
}


// actions creators
export const setToken = (token) => ({ type: "setToken", payload: token  });
export const setConnected = (isConnected) => ({ type: "setConnected", payload:isConnected  });


// reducer : takes state and action => returns new state
function reducer(state = initialState, action) {
    if ( action.type === 'setToken') {
        return produce(state, (draft) => {
            draft.token = action.payload;
        });
    }
    if ( action.type === 'setConnected') {
        return produce(state, (draft) => {
            draft.isConnected = action.payload;
        });
    }
    return state;
}



export const store = createStore(reducer);

store.subscribe(() => {
    console.log("Nouveau state:");
    console.log(store.getState());
});