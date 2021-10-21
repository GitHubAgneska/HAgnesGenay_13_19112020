import { useHistory } from "react-router-dom";
import { useStore, useSelector } from "react-redux";
import { StatusWrapper, SignInWrapper} from './User-status_style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { loginState, store } from '../../state/store'

/* ${() => isConnected && `min-width:70px`} */
/* ${() => !isConnected && `min-width:0px`} */
const UserId = styled(StatusWrapper)`

    justify-content: start;
    margin-right:1%;
    flex-basis:20%;

        
    p {
        white-space: nowrap;
        margin: 0;
        font-weight: bold;
    }
    svg { margin-right:2%; }
`;

const Userstatus = () => {

    const isConnected = loginState(store.getState()).isConnected;
    const history = useHistory();
    
    function signIn () { history.push("/signIn");}
    function signOut () {
        // requestLogout()
        console.log('user requested to sign out'); }
    
    return (
        <StatusWrapper>
            
            <UserId $isConnected>
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