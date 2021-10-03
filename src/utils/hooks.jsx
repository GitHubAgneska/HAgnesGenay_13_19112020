import { useState, useEffect } from "react"

const apiBaseUrl = 'localhost:3001/api/v1';
const loginEndpoint = '/user/login';

/**
*  APP CRUD OPERATIONS
* --------------------
* => 1 - LOGIN : POST request 
* @function useFetchForLogin
* @param {string} url - API endpoint
* @param {object} user - payload : The user to be identified
* @returns {string} token - will allow the login and then keep user connected 
*/

export function useFetchForLogin(url, user) {
    
    url = apiBaseUrl+loginEndpoint;
    
    const [token, setToken ] = useState({});
    const [isLoading, setLoading ] = useState(true);
    const [error, setError ] = useState(false);

    useEffect(() => {
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
}