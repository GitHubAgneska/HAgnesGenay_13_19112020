import { useDispatch, useSelector, useStore } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginState, userDataState } from '../../state/store'

import { fetchLogout } from '../../features/login-feature'

import { StatusWrapper, SignInWrapper, UserId } from './User-status_style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Userstatus = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const isConnected = useSelector(loginState).isConnected

  const user = useSelector(userDataState)
  const profileData = user?.data ?? {} // ------- ! very important for runtime ! (else data = null )
  const { firstName } = profileData


  const navigateTosignIn = () => { history.push('/signIn') }

  const signOut = () => {
    dispatch(fetchLogout())
    
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
