import { useState } from "react"
import { devEnvironment } from '../utils/environment-dev'

/**
*  APP CRUD OPERATIONS
* --------------------
* => 1 - LOGIN : POST request  ( custom hook )
* @function useFetchForLogin
* @param {string} url - API endpoint
* @param {object} values - payload : values from form  @example { email:'xxxxx', password:'xxxxx', rememberMe:true } : The user to be identified
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
    return [ postData, isLoading, token ]
}
