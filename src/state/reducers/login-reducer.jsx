import { SET_TOKEN, SET_CONNECTED } from '../ActionTypes'
import { initialState } from '../store'

// ......................................................
// LOGIN  REDUCER
// ......................................................
function loginReducer(state = initialState.Login, action) {

    switch (action.type) {
        case  SET_TOKEN: 
            return produce(state, (draft) => {
                draft.token = action.payload;
            });
        case SET_CONNECTED:
            return produce(state, (draft) => {
                draft.isConnected = action.payload;
            });
        default:
            return state
    }
}

export default loginReducer