import { useHistory } from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import { StatusWrapper, SignInWrapper } from './User-status_style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { loginState, userDataState } from '../../state/store'
import { fetchLogout } from '../../features/login-feature'

const UserId = styled(StatusWrapper)`

    justify-content: start;
    margin-right:1%;
    flex-basis:20%;

    ${(isConnected) => isConnected && 'min-width:70px'}
    ${(isConnected) => !isConnected && 'min-width:0px'}
    min-width: ${isConnected => isConnected && '70px'}
    min-width: ${isConnected => !isConnected && '0px'}
    
    p {
        white-space: nowrap;
        margin: 0;
        font-weight: bold;
    }
    svg { margin-right:2%; }
`

const Userstatus = () => {
  const isConnected = useSelector(loginState).isConnected
  const user = useSelector(userDataState)
  const profileData = user?.data ?? {} // ------- ! very important for runtime ! (else data = null )
  const { firstName } = profileData

  const history = useHistory()
  const store = useStore()
  const navigateTosignIn = () =>{ history.push('/signIn') }

  const signOut = () => {
    fetchLogout(store)
    navigateTosignIn()
  }


  return (
    <StatusWrapper>

      <UserId $isConnected>
        <FontAwesomeIcon icon={faUserCircle} />
        {isConnected ? <p>{firstName}</p> : null}
      </UserId>

      {isConnected
        ? <SignInWrapper onClick={() => signOut()} $isConnected>
          <FontAwesomeIcon icon={faArrowRight} />
          <p>Sign out</p>
        </SignInWrapper>

        : <SignInWrapper onClick={() => navigateTosignIn()} $isConnected><p>Sign In</p></SignInWrapper>}

    </StatusWrapper>
  )
}

Userstatus.defaultProps = {
  isConnected: false
}
export default Userstatus
