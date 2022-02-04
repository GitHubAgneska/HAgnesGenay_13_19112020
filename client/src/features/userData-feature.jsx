import { loginState, userDataState } from '../state/store'
import { 
  userPersDataFetching, userPersDataResolved, userPersDataRejected,
  setFirstName, setLastName

} from '../state/Actions'

import { devEnvironment, prodEnvironment } from '../utils/environment-dev'
const apiUrl = prodEnvironment.apiBaseUrl
const bearer = devEnvironment.bearer


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
export function fetchUserData () {

  return async function fetchUserDataThunk (dispatch, getState) {
    const status = userDataState(getState()).status
    if ( status === 'pending' || status === 'updading') { return }
    
    const token = loginState(getState()).token
    const id = loginState(getState()).id

    dispatch(userPersDataFetching(token))

    try {
      const response = await fetch(apiUrl + '/profile/' +id, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer' + token,
          'x-api-key': bearer, // necessary ?
          Accept: 'text/html', //  ---- "
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' //  ---- "
        }
      })

      const responseObj = await response.json() // => status / message / body
      console.log('RESPONSE TO CLIENT FETCH=>', responseObj)

      if (responseObj.status === 200) {
          dispatch(userPersDataResolved(responseObj)) // => set post status to resolved + update collection
          dispatch(setFirstName(responseObj.body.firstName))
          dispatch(setLastName(responseObj.body.lastName))
      } else {
          dispatch(userPersDataRejected(responseObj.message))
      }
      return responseObj
      
      } catch (error) {
          dispatch(userPersDataRejected(error))
          return error
      }
    }
}
/* 

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
} */
