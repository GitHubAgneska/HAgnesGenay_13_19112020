/**
* INITIALLY:  BEFORE REDUX IMPLEMENTATION IN THE PROJECT
* this file gathering all crud operations using CUSTOM HOOKS was created
* so that all api calls would happen outside from the components, as well as the state setting ('setState()')
* to unload a maximum of responsibilities from them, components.
* The components would then use these hooks by calling their exported functions only,
* and then use their returned data locally, once the state has been set by the hook.
*
* ===> WITH the implementation of Redux:
* If using this same logic but with a store (dispatching data at api response)
* the main issue becomes the lag between asynchronous calls, 
* ( e.g: 'userProfile' component loads and calls 'useFetchUserProfile()' async method, 
* which dispatches new state for user => the data is retrieved, but the component is already loaded without the data).
* => CHANGE IN IMPLEMENTATION :
* This custom hooks file gets divided into separate 'features',
* with a fetch method that is not a custom hook anymore (the component calls the method directly, not an exported version of it)
* each fetch feature has a 'status' state (pending, rejected, etc) in store, 
*  
* the components are still in charge of calling api requests functions
* but the returned data is dealt with by the Store ( using 'dispatch()', and as a whole object 'data' - 
* (which consequently brings changes in actions/reducers/selectors/ --- )).
* Once the component has called the function ( e.g 'FetchSignup()')
* it can check the request's status ( which happens asynchronously) 
* and only then, can retrieve locally the new data from the store.
* The component retrieves the whole 'data' object and destructures it into props for its needs
*/ 

import { useState } from "react"
import { useStore } from "react-redux";
import { setToken, setConnected, setId, setEmail, setPassword, setFirstName, setLastName, setTotalAccounts, setAccounts } from '../state/Actions'
import { devEnvironment } from '../utils/environment-dev'
import { userModel } from '../models/userModel'
import { store } from "../state/store";

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
    // const token = useSelector( (token) => token);

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
            // console.log('api response=', apiResponse);

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
    
    // let url = devEnvironment.apiBaseUrl + devEnvironment.userProfileEndpoint;
    let bearer = devEnvironment.bearer;
    const [userData, setUserData ] = useState(new userModel());
    const [isLoading, setLoading ] = useState(true);
    const [error, setError ] = useState(false);

    const getUserProfile = async (token, url) => {
        setLoading(true);
        if ( !url) { url = devEnvironment.apiBaseUrl + devEnvironment.userProfileEndpoint;}
        
        try {
            const response = await fetch(url, { 
                method: 'POST',
                withCredentials: true,
                credentials: "include",
                // mode: 'cors',
                headers: {
                    'Authorization': 'Bearer' + token,
                    'x-api-key': 'tempAccess',          // necessary ?
                     Accept: "text/html",                //  ---- "
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'  //  ---- "
                }
            });
            const apiResponse = await response.json();
            console.log('apiResponse=', apiResponse);

            if ( apiResponse.status === 200 ) {
                const apiBodyUser = apiResponse.body;
                setUserData({userData:apiBodyUser})
                // console.log('apiBodyUser=', apiBodyUser);
                store.dispatch(setEmail(apiBodyUser.email));
                store.dispatch(setId(apiBodyUser.id));
                store.dispatch(setFirstName(apiBodyUser.firstName));
                store.dispatch(setLastName(apiBodyUser.lastName));
            }
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



