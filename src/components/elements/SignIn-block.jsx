import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


const SignInSection = styled.section`
    box-sizing: border-box;
    background-color: white;
    width: 300px;
    margin: 0 auto;
        margin-top: 0px;
    margin-top: 3rem;
    padding: 2rem;
    h1 {
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        margin-block-start: .83em;
        margin-block-end: .83em;
    }
    button { 
        display: block;
        width: 100%;
        padding: 8px;
        font-size: 1.1rem;
        font-weight: bold;
        margin-top: 1rem;
        border-color: #00bc77;
        background-color: #00bc77;
        color: #fff;
    }
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
    label { font-weight: bold; }
    input {
        padding: 5px;
        font-size: 1.2rem;
    }
`;
const RememberInput = styled.div` display: flex; label { margin-left: 0.25rem;}`;

const SignInBlock = () => {
    return (
        <SignInSection>

            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign In</h1>
            <form>
                <InputWrapper>
                    <label for="username">UserName</label>
                    <input type="text" id="username"></input>
                </InputWrapper>
                <InputWrapper>
                    <label for="password">Password</label>
                    <input type="text" id="password"></input>
                </InputWrapper>

                <RememberInput>
                    <input type="checkbox" id="remember-me"></input>
                    <label for="remember-me">Remember me</label>
                </RememberInput>

                <button>Sign In</button>
            </form>

        </SignInSection>
    )
}
export default SignInBlock