import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


let isConnected = false;
const StatusWrapper = styled.div`
    /* border: 2px dotted green; */
    display: flex; flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const UserId = styled(StatusWrapper)`
    justify-content: start;
    margin-right:1%;
    flex-basis:20%;
    
    ${() => isConnected && `min-width:70px`}
    ${() => !isConnected && `min-width:0px`}
        
    p {
        white-space: nowrap;
        margin: 0;
        font-weight: bold;
    }
    svg { margin-right:2%; }
`;

const SignInWrapper = styled(StatusWrapper)`
    justify-content: end;
    margin-left:1%;
    white-space: nowrap;
    p { 
        margin: 0;
        white-space: nowrap;
        font-weight: bold;
        &:hover { text-decoration: underline; }
    }
    svg { margin-right:2%; }
`;


const Userstatus = ({isConnected}) => {
    const history = useHistory();
    
    function signIn () { history.push("/signIn");}
    function signOut () { console.log('user requested to sign out'); }
    
    return (
        <StatusWrapper>
            
            <UserId $connected>
                <FontAwesomeIcon icon={faUserCircle} />
                { isConnected? <p>User name</p> : null }
            </UserId>

            { isConnected?
                    <SignInWrapper onClick={() => signOut()}>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <p>Sign out</p>
                    </SignInWrapper>

                    :  <SignInWrapper onClick={() => signIn()}><p>Sign In</p></SignInWrapper>
            }

        </StatusWrapper>
    )
}

Userstatus.defaultProps = { 
    isConnected :false
}
export default Userstatus