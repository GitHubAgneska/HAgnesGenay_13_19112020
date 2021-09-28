import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'

const StatusWrapper = styled.div`
    border: 4px dotted green;
    display: flex; flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const UserId = styled(StatusWrapper)`
    border: 1px solid yellow;
    justify-content: start;
    margin-right:1%;
    min-width:70px; flex-basis:20%;
    p {
        white-space: nowrap;
        margin: 0;
        font-weight: bold;
    }
    svg { margin-right:1%; }
`;

const SignInWrapper = styled(StatusWrapper)`
    border: 1px solid blue;
    justify-content: end;
    min-width:70px;
    margin-left:1%;
    p { 
        margin: 0;
        font-weight: bold;
        &:hover { 
            text-decoration: underline;
        }
    }
    svg { margin-right:1%; }
`;

const Userstatus = () => { 
    return (
        <StatusWrapper>
            <UserId>
                <FontAwesomeIcon icon={faUserCircle} />
                <p>User name</p>
            </UserId>
            <SignInWrapper>
                <FontAwesomeIcon icon={faArrowRight} />
                <p>Sign In</p>
            </SignInWrapper>
        </StatusWrapper>
    )
}

export default Userstatus