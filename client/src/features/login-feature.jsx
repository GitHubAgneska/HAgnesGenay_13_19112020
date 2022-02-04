import { devEnvironment, prodEnvironment } from '../utils/environment-dev'
import { loginState } from '../state/store'
import { setId, loginFetching, loginResolved, loginRejected, logout } from '../state/Actions'

/**
*  LOGIN : POST request
* @function fetchLogin
* @param {store}
* @param {object} user - payload : values from form  @example of params => { email:'xxxxx', password:'xxxxx', rememberMe:true } : The user to be identified
*/

const apiUrl = prodEnvironment.apiBaseUrl
const bearer = prodEnvironment.bearer

export function fetchLogin (user) {
  return async function fetchLoginThunk(dispatch, getState) {
    
    const status = loginState(getState()).status
    if (status === 'pending' || status === 'updating') { return }

    dispatch(loginFetching())

    try {
      const response = await fetch(apiUrl + '/login', {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: bearer,
          Accept: 'text/html', //  ---- "
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(user)
      })
      const apiResponse = await response.json()
      console.log('api response===>', apiResponse)

      if (apiResponse.status === 200) {
        dispatch(loginResolved(apiResponse))
        dispatch(setId(apiResponse.body.id))
    }
    return apiResponse

    } catch (error) {
      dispatch(loginRejected(error))
      return error
    }
  }
}

export function fetchLogout (store) {
  store.dispatch(logout)
}
