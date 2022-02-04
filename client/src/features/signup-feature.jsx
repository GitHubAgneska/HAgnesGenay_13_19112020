import { userDataState } from '../state/store'
import {
    userPersData_createFetching,
    userPersData_createResolved,
    userPersData_createRejected
} from '../state/Actions'
import { devEnvironment, prodEnvironment } from '../utils/environment-dev'

const apiUrl = prodEnvironment.apiBaseUrl
const bearer = prodEnvironment.bearer
/**
 *
 * @route   POST /
 * @desc    Create a user
 * @access  Public
 *
 * @param {object} user
 * @returns {Promise<object>} response JSON
 */
// Thunk function : necessary to pass user object using thunk creator
export function createEmployee (user) {
  return async function createNewEmployeeThunk (dispatch, getState) { // returns thunk
    const status = userDataState(getState()).post_status
    if (status === 'pending' || status === 'updating ') { return }
    dispatch(userPersData_createFetching(user))

    try {
        const response = await fetch(apiUrl + '/users', {
            method: 'POST',
            withCredentials: false,
            headers: {
            Accept: 'text/html',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(user)
        })

        const responseObj = await response.json() // => status / message / body

        if (responseObj === 200) {
            dispatch(userPersData_createResolved(responseObj))
        } else {
            dispatch(userPersData_createRejected(responseObj.message))
        }
        return responseObj
        
        } catch (error) {
            dispatch(userPersData_createRejected(error))
            return error
        }
    }
}
