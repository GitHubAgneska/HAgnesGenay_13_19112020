import { useSelector, useStore, useDispatch} from 'react-redux'
import { useEffect } from 'react'

import { fetchUserData } from '../../features/userData-feature'
import { loginState, userDataState } from '../../state/store'


import UserIntro from '../elements/User-intro'
import Accounts from '../elements/Accounts'

import { SrOnlyH2 } from '../../style/global_style'
import styled from 'styled-components'

const UserPageSection = styled.main`
    background-color: #12002b;
    display: flex; flex-direction: column;
`

const UserProfile = (userId) => {

  const dispatch = useDispatch()
  const userDataStatus = useSelector(userDataState => userDataState.status)
  const user = useSelector(userDataState)
  
  useEffect(() => {
    if (userDataStatus !== 'resolved') dispatch(fetchUserData(userId))
  }, [])


  const profileData = user?.data ?? {} // ------- ! very important for runtime ! (else data = null )
  const { firstName, lastName } = profileData

  return (
    <UserPageSection>
      <UserIntro firstName={firstName} lastName={lastName} />
      <SrOnlyH2>Accounts</SrOnlyH2>
      <Accounts />
    </UserPageSection>
  )
}
export default UserProfile
