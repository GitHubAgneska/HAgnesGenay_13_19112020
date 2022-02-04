import styled from 'styled-components'
import SignInBlock from '../elements/SignIn-block'

const SignInPageSection = styled.main`
    background-color: #12002b;
    min-height: 100vh;
    display: flex; flex-direction: column;
`

const SignIn = () => {
  return (
    <SignInPageSection>
      <SignInBlock />
    </SignInPageSection>
  )
}
export default SignIn
