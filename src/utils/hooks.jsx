import { useState, useRef, useEffect } from "react"
import { useStore, useSelector } from "react-redux";
import { setToken, setConnected, setId, setEmail, setPassword, setFirstName, setLastName, setTotalAccounts, setAccounts } from '../state/Actions'
import { devEnvironment } from '../utils/environment-dev'
import { userModel } from '../models/userModel'

/**
*  APP CRUD OPERATIONS
* --------------------
* => 1 - SIGN UP : POST request to create a new user
*  -- ! the app does not have a dedicated feature for user creation atm ---
* @function useFetchForSignUp : custom hook
* @param {string} url - API endpoint
* @param {object} user - payload : values from a signup form  @example of params => { email:'xxxxx', password:'xxxxx', firstName: 'xxxxx', lastName: 'xxxxx' } : The user to be created
* @returns {function} createUser() : for signup component to use @example => const [ createUser, isLoading, creationSuccessful ] = useFetchForSignUp(); myFunction() { createUser() }; 
* @returns {boolean} isLoading
* @returns {boolean} creationSuccessful
* @returns {object} api response: ex: {  "status": 0, "message": "string",  "body": { "id": "string", "email": "string" }  }
*/
export function useFetchForSignUp(url, user) {
    
    url = devEnvironment.apiBaseUrl + devEnvironment.signUpEndpoint;
    let bearer = devEnvironment.bearer; // api access authorization
    
    const [isLoading, setLoading ] = useState(true);
    const [creationSuccessful, setCreationSuccessful ] = useState(false);
    const [error, setError ] = useState(false);

    const createUser= async (user) => {
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
            const apiResponse = await response.json();
            setCreationSuccessful(true);
        }
        catch(err) {
            console.log(err, err.type);
            setError(true);
        }
        finally { setLoading(false);}
    }
    return [ createUser, isLoading, creationSuccessful ];
}

/**
*  APP CRUD OPERATIONS
* --------------------
* => 2 - LOGIN : POST request
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

    const store = useStore();
    const token = useSelector( (token) => token);

    const [ isLoading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    
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

            const apiResponse = await response.json();
            console.log('api response=', apiResponse);

            if ( apiResponse.status === 200 ) {
                const token = apiResponse.body.token;
                store.dispatch(setToken(token));
                store.dispatch(setConnected(true));
            }
        }
        catch(err) {
            console.log(err, err.type);
            setError(true);
        }
        finally { 
            setLoading(false);}
    }
    return [ postData, isLoading, error ];
}


/**
*  APP CRUD OPERATIONS
* --------------------
* => 3 - RETRIEVE USER PROFILE : POST request ( custom hook )
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

    const [userData, setUserData ] = useState(new userModel());
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
            console.log('apiResponse=', apiResponse);
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

/**
*  APP CRUD OPERATIONS
* --------------------
* => 4 - EDIT USER NAME : PUT request ( custom hook )
* @function useFetchEditUserName
* @param {string} url - API endpoint
* @param {string} token - user token to identify request to api
* @param {object} user - user data to be mofified : ex: { firstName: 'xxx', lastName: 'xxxx' }
* @returns {function} editUserName() : for other components to use @example of use: const [ editUserName, isLoading, editSuccesful ] = useFetchEditUserName(); myFunction() { editUserName()}; 
*  @function editUserName() (fetch) will receive api response :
    @example {
                "status": 0,
                "message": "string",
                "body": {
                    "id": "string",
                    "email": "string"
            }
*   then set 'editSuccesful' state to true
*   
*/
export function useFetchEditUserName(url, token, user) {
    
    url = devEnvironment.apiBaseUrl + devEnvironment.userProfileEndpoint;

    const [userData, setUserData ] = useState();
    const [isLoading, setLoading ] = useState(true);
    const [error, setError ] = useState(false);
    const [editSuccesful, setEditSuccesful ] = useState(false);

    const editUserName = async (token) => {
        if ( !url) return;
        setLoading(true);
        try {
            const response = await fetch(url, { 
                method: 'PUT',
                withCredentials: true,
                credentials: "include",
                // mode: 'cors',
                headers: {
                    'Authorization': token,
                    'x-api-key': 'tempAccess',          // necessary ?
                     Accept: "text/html",                //  ---- "
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'  //  ---- "
                },
                body: JSON.stringify(user)
            });
            const apiResponse = await response.json();
            console.log('apiResponse=', apiResponse);
            setEditSuccesful(true);
        }
        catch(err) {
            console.log(err, err.type);
            setError(true);
        }
        finally { setLoading(false);}
    }
    return [ editUserName, isLoading, editSuccesful ];
}



