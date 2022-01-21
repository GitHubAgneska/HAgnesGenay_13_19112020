import { devEnvironment } from '../utils/environment-dev'
import { loginState } from "../state/store"
import { loginFetching, loginResolved, loginRejected, logout } from '../state/Actions'

/**
*  LOGIN : POST request
* @function fetchLogin
* @param {store}
* @param {object} user - payload : values from form  @example of params => { email:'xxxxx', password:'xxxxx', rememberMe:true } : The user to be identified
*/
export async function fetchLogin(store, user) {

    const url = devEnvironment.apiBaseUrl + devEnvironment.loginEndpoint;
    const bearer = devEnvironment.bearer;
    const status = loginState(store.getState()).status;
    
    if ( status === 'pending' || status === 'updating' ) { return }
    // dispatch 'loginFetching' action : request is ongoing
    store.dispatch(loginFetching());
    try {
        const response = await fetch(url, { 
            method: 'POST',
            withCredentials: true,
            credentials: "include",
            mode: 'cors',
            headers: {
                'Authorization': bearer,
                'x-api-key': bearer,                // necessary ?
                Accept: "text/html",                //  ---- "
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  //  ---- "
            },
            body: JSON.stringify(user)
        });
        const apiResponse = await response.json();
        // console.log('api response=', apiResponse);

        // request successful: data dispatched to store using loginResolved action        
        store.dispatch(loginResolved(apiResponse.body));
    }
    catch (error) {
        // if error: request rejected status dispatched to store using loginRejected action
        store.dispatch(loginRejected(error))
    }
}


export function fetchLogout(store) {
    store.dispatch(logout); // ---- why syntax different from 'store.dispatch(loginFetching())' --? 
}
