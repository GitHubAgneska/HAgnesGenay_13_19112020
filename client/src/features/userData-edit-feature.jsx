import { devEnvironment, prodEnvironment } from '../utils/environment-dev'
import { loginState, userDataState } from '../state/store'
import { userPersData_EditFetching, userPersData_EditResolved, userPersData_EditRejected, setFirstName, setLastName, userPersDataFetching } from '../state/Actions'
const apiUrl = prodEnvironment.apiBaseUrl
const bearer = prodEnvironment.bearer
/**
*  EDIT USERDATA : PUT request
* @function editUserData
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
export function editUserData (user) {

  return async function editUserDataThunk (dispatch, getState) {

    const status = userDataState(getState()).editStatus
    const token = loginState(getState()).token
    const id = loginState(getState()).id
  
    if (status === 'pending' || status === 'updating') { return }

    dispatch(userPersData_EditFetching())
  
    try {
      const response = await fetch(apiUrl + '/profile/' +id, {
        method: 'PUT',
        withCredentials: true,
        credentials: 'include',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer' + token,
          'x-api-key': bearer, // necessary ?
          Accept: 'text/html', //  ---- "
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' //  ---- "
        },
        body: JSON.stringify(user)
      })
      const apiResponse = await response.json()
      console.log('PUT api response=', apiResponse);
      if (apiResponse.status === 200) {
        dispatch(userPersData_EditResolved(apiResponse.body))
        dispatch(setFirstName(user.firstName))
        dispatch(setLastName(user.lastName))
      } else {
        dispatch(userPersData_EditRejected(apiResponse.message))
    }
    return apiResponse

    } catch (error) {
      dispatch(userPersData_EditRejected(error))
    }
  }
}
