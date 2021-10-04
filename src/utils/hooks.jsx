import { useState, useEffect } from "react"

const apiBaseUrl = 'localhost:3001/api/v1';
const loginEndpoint = '/user/login';
const bearer = 'tempAccess';

/**
*  APP CRUD OPERATIONS
* --------------------
* => 1 - LOGIN : POST request  ( custom hook )
* @function useFetchForLogin
* @param {string} url - API endpoint
* @param {object} values - payload : values from form  @example { email:'xxxxx', password:'xxxxx', rememberMe:true } : The user to be identified
* @returns {string} token - will allow the login and then keep user connected 
*/

export function useFetchForLogin(url, user) {
    
    url = 'http://localhost:3001/api/v1/user/login';

    const [token, setToken ] = useState('');
    const [isLoading, setLoading ] = useState(true);
    const [error, setError ] = useState(false);

    const postData = async (user) => {
       //  if ( !url) return;
        setLoading(true);
        console.log('USER IN USEFETCH==', user);
        console.log('URL==', url);
        try {
            const response = await fetch(url, { 
                method: 'POST',
                withCredentials: true,
                credentials: "include",
                // mode: 'cors',
                headers: {
                    'Authorization': bearer,
                    'x-api-key': 'tempAccess',
                    Accept: "text/html",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user)
            });

            const token = await response.json(); console.log('TOKEN=', token);
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

    /*  useEffect(() => {
        if ( !url) return;
        setLoading(true);

        async function postData() {
            try{
                const response = await fetch(url, { 
                    method: 'POST',
                    data: user,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user) });

                const token = await response.json(); console.log('TOKEN=', token);
                setToken(token);
            }
            catch(err) {
                console.log(err);
                setError(true);
            }
            finally {
                setLoading(false);
            }
        }
        postData()
    }, [url, user]) 

    return { isLoading, token, error }
    */
