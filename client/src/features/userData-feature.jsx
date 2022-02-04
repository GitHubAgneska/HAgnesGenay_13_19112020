import { devEnvironment } from '../utils/environment-dev'
import { loginState, userDataState } from '../state/store'
import { userPersDataFetching, userPersDataResolved, userPersDataRejected } from '../state/Actions'

/**
*  FETCH USERDATA : POST request
* @function fetchUserData
* @param {store}
* @param {string} token - user token to identify request to api ---> necessary as param or can be done here?
* api response @example {
                "status": 200,
                "message": "Successfully got user profile data",
                "body": {
                    "email": "bj@horseman.com",
                    "firstName": "Bojack",
                    "lastName": "Horseman",
                    "createdAt": "2021-09-21T09:26:17.040Z",
                    "updatedAt": "2021-09-21T09:26:17.040Z",
                    "id": "6149a539813f9cb73be080eb"
                }
            }
*/
export async function fetchUserData (store) {
  const url = devEnvironment.apiBaseUrl + devEnvironment.userProfileEndpoint
  const bearer = devEnvironment.bearer
  const status = userDataState(store.getState()).status
  const token = loginState(store.getState()).token

  if (status === 'pending' || status === 'updating') { return }
  // dispatch 'userPersDataFetching' action : request is ongoing
  store.dispatch(userPersDataFetching())

  try {
    const response = await fetch(url, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      // mode: 'cors',
      headers: {
        Authorization: 'Bearer' + token,
        'x-api-key': bearer, // necessary ?
        Accept: 'text/html', //  ---- "
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' //  ---- "
      }
    })
    const apiResponse = await response.json()
    // console.log('apiResponse user data =', apiResponse);
    store.dispatch(userPersDataResolved(apiResponse.body))
  } catch (error) {
    // if error: request rejected status dispatched to store using loginRejected action
    store.dispatch(userPersDataRejected(error))
  }
  // finally { setLoading(false);} // ------- TO REVIEW
}
