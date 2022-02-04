import SignUpBlock from "../elements/SignUp-block"
import styled from 'styled-components'

const SignUpPageSection = styled.main`
    background-color: #12002b;
    min-height: 100vh;
    display: flex; flex-direction: column;
`

const SignUpPage = () => {
    return (

        <SignUpPageSection>
            <SignUpBlock />
        </SignUpPageSection>
    )
}
export default SignUpPage