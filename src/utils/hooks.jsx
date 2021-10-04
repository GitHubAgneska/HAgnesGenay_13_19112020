import { useState } from "react"
import { devEnvironment } from '../utils/environment-dev'
import { userModel } from '../models/userModel'
/**
*  APP CRUD OPERATIONS
* --------------------
* => 1 - LOGIN : POST request
* @function useFetchForLogin : custom hook
* @param {string} url - API endpoint
* @param {object} values - payload : values from form  @example of params => { email:'xxxxx', password:'xxxxx', rememberMe:true } : The user to be identified
* @returns {function} postData() : for other components to use @example => const [ postData, isLoading, token ] = useFetchForLogin(); myFunction() { postData()}; 
* @returns {boolean} isLoading
* @returns {object} token - will allow the login and then keep user connected 
*/


export function useFetchForLogin(url, user) {
    
    url = devEnvironment.apiBaseUrl + devEnvironment.loginEndpoint;
    let bearer = devEnvironment.bearer;
    
    const [token, setToken ] = useState('');
    const [isLoading, setLoading ] = useState(true);
    const [error, setError ] = useState(false);

    const postData = async (user) => {
        if ( !url) return;
        setLoading(true);

        try {
            const response = await fetch(url, { 
                method: 'POST',
                withCredentials: true,
                credentials: "include",
                // mode: 'cors',
                headers: {
                    'Authorization': bearer,
                    'x-api-key': 'tempAccess',          // necessary ?
                    Accept: "text/html",                //  ---- "
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'  //  ---- "
                },
                body: JSON.stringify(user)
            });

            const token = await response.json();
            setToken(token);
        }
        catch(err) {
            console.log(err, err.type);
            setError(true);
        }
        finally { setLoading(false);}
    }
    return [ postData, isLoading, token ];
}


/**
*  APP CRUD OPERATIONS
* --------------------
* => 2 - RETRIEVE USER PROFILE : POST request ( custom hook )
* @function useFetchUserProfile
* @param {string} url - API endpoint
* @param {string} token - user token to identify request to api
* @returns {function} getUserProfile() : for other components to use @example of use: const [ getUserProfile, isLoading ] = useFetchUserProfile(); myFunction() { getUserProfile()}; 
*  @function getUserProfile() (fetch) will receive api response :
    @example {
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
*   and will retrieve userData from api response body,
*   then cast it into a new object 'userData' using 'userModel'
*   
*/
export function useFetchUserProfile(url, token) {
    
    url = devEnvironment.apiBaseUrl + devEnvironment.userProfileEndpoint;

    const [userData, setUserData ] = useState(new userModel({}));
    const [isLoading, setLoading ] = useState(true);
    const [error, setError ] = useState(false);

    const getUserProfile = async (token) => {
        if ( !url) return;
        setLoading(true);
        try {
            const response = await fetch(url, { 
                method: 'POST',
                withCredentials: true,
                credentials: "include",
                // mode: 'cors',
                headers: {
                    'Authorization': token,
                    'x-api-key': 'tempAccess',          // necessary ?
                     Accept: "text/html",                //  ---- "
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'  //  ---- "
                }
            });
            const apiResponse = await response.json();
            const apiBodyUser = apiResponse.body;
            console.log('apiBodyUser=', apiBodyUser);
            let newUser =  new userModel();  // -------- to review 
            setUserData(apiBodyUser);        // --------   " 
            console.log('state userData=', userData);
        }
        catch(err) {
            console.log(err, err.type);
            setError(true);
        }
        finally { setLoading(false);}
    }
    return [ getUserProfile, isLoading, userData ];

}   

