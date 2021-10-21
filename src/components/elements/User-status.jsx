import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { StatusWrapper, SignInWrapper} from './User-status_style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { loginState } from '../../state/store'
import { userDataState } from "../../state/store"

const UserId = styled(StatusWrapper)`

    justify-content: start;
    margin-right:1%;
    flex-basis:20%;

    ${(isConnected) => isConnected && `min-width:70px`}
    ${(isConnected) => !isConnected && `min-width:0px`}
    min-width: ${isConnected => isConnected && `70px`}
    min-width: ${isConnected => !isConnected && `0px`}
    
    p {
        white-space: nowrap;
        margin: 0;
        font-weight: bold;
    }
    svg { margin-right:2%; }
`;

const Userstatus = () => {

    const isConnected = useSelector(loginState).isConnected;
    const user = useSelector(userDataState);
    const profileData = user?.data ?? {} ;   // ------- ! very important for runtime ! (else data = null )
    const  { firstName } = profileData
    
    const history = useHistory();
    
    function signIn () { history.push("/signIn");}
    function signOut () {
        // requestLogout()
        console.log('user requested to sign out'); }
    
    return (
        <StatusWrapper>
            
            <UserId $isConnected>
                <FontAwesomeIcon icon={faUserCircle} />
                { isConnected? <p>{firstName}</p> : null }
            </UserId>

            { isConnected?
                    <SignInWrapper onClick={() => signOut()} $isConnected>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <p>Sign out</p>
                    </SignInWrapper>

                    :  <SignInWrapper onClick={() => signIn()} $isConnected><p>Sign In</p></SignInWrapper>
            }

        </StatusWrapper>
    )
}

Userstatus.defaultProps = { 
    isConnected :false
}
export default Userstatus