import { devEnvironment } from '../utils/environment-dev'
import { loginState, userDataState } from "../state/store"
import { userPersData_EditFetching, userPersData_EditResolved, userPersData_EditRejected } from '../state/Actions'

/**
*  EDIT USERDATA : PUT request
* @function editUserData
* @param {store}
* @param {string} token - user token to identify request to api ---> necessary as param or can be done here?
* @param {object} userObject (firstName+lastName ) 
* api response @example {
                            "status": 0,
                            "message": "string",
                            "body": {
                                "id": "string",
                                "email": "string"
                            }
                        } 
*/
export async function editUserData(store, user) {
    
    const url = devEnvironment.apiBaseUrl + devEnvironment.userProfileEndpoint;
    const bearer = devEnvironment.bearer;
    const status = userDataState(store.getState()).editStatus;
    const token = loginState(store.getState()).token;

    if ( status === 'pending' || status === 'updating') { return }
    // dispatch 'userPersDataFetching' action : request is ongoing
    store.dispatch(userPersData_EditFetching());

    try {
        const response = await fetch(url, {
            method: 'PUT',
            withCredentials: true,
            credentials: "include",
            // mode: 'cors',
            headers: {
                'Authorization': 'Bearer' + token,
                'x-api-key': bearer,                  // necessary ?
                Accept: "text/html",                  //  ---- "
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'    //  ---- "
            },
            body: JSON.stringify(user)
        });
        const apiResponse = await response.json();
        // console.log('api response=', apiResponse);
        store.dispatch(userPersData_EditResolved(apiResponse.body));
    }
    catch(error) {
        // if error: request rejected status dispatched to store using loginRejected action
        store.dispatch(userPersData_EditRejected(error));
    }
}